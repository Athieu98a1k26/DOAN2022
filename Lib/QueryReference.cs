using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using Rws.Data;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Rws
{
    public class QueryReference<TEntity>
    {
        private List<RsDynamic> _list;

        private IQueryable<TEntity> _query;

        //private bool _paginated = false;
        private bool _selected = false;

        private int _total;

        public QueryReference(IQueryable<TEntity> query)
        {
            var type = typeof(TEntity);
            if (type.GetProperty("Id") == null)
            {
                throw new Exception("Đối tượng không có thuộc tính Id");
            }

            _query = query;
        }

        public int Total
        {
            get
            {
                if (_total == 0 && _list != null && _list.Count > 0)
                {
                    return _list.Count;
                }
                return _total;
            }
        }

        public IQueryable<TEntity> GetQuery()
        {
            return _query;
        }

        public void OrderBy<TKey>(Expression<Func<TEntity, TKey>> keySelector, bool desc)
        {
            if (desc)
            {
                _query = _query.OrderByDescending(keySelector);
            }
            else
            {
                _query = _query.OrderBy(keySelector);
            }
        }

        public void Paginate(int page = 1, int pagesize = 20)
        {
            if (_selected)
            {
                throw new Exception("Vui lòng gọi phân trang trước select base");
            }

            _total = _query.Count();
            _query = _query.Skip((page - 1) * pagesize).Take(pagesize);
        }

        public async Task SelectEntryAsync()
        {
            await SelectEntryAsync(_query);
        }

        public async Task SelectEntryAsync<TType>(Func<IQueryable<TEntity>, IQueryable<TType>> queryFunc)
        {
            await SelectEntryAsync(queryFunc(_query));
        }

        public async Task SelectEntryAsync<TType>(IQueryable<TType> query)
        {
            _selected = true;

            var list = await query.ToListAsync();

            _list = new List<RsDynamic>();

            list.ForEach(item =>
            {
                RsDynamic data = JsonConvert.DeserializeObject<RsDynamic>(JsonConvert.SerializeObject(item));

                _list.Add(data);
            });
        }

        public async Task SelectCollectionAsync<TType, TResult>(string propertyName, Func<IQueryable<TEntity>, IQueryable<TType>> queryFunc, Func<TType, int> foreignKeyFunc, Func<TType, TResult> valueFunc) where TType : class
        {
            if (propertyName == null)
            {
                throw new Exception("Tên thuộc tính không được null");
            }

            if (!_selected)
            {
                throw new Exception("Vui lòng gọi select base trước");
            }

            var list = await queryFunc(_query).ToListAsync();

            _list.ForEach(item =>
            {
                var sublist = list.Where(x => Convert.ToInt32(item["Id"]) == foreignKeyFunc(x))
                    .Select(x => valueFunc(x)).Distinct().ToList();

                item[propertyName] = sublist;
            });
        }

        public async Task SelectCollectionAsync<TMiddle, TType>(string propertyName,
            Func<IQueryable<TEntity>, IQueryable<TMiddle>> mdQueryFunc, Func<IQueryable<TMiddle>, IQueryable<TType>> queryFunc,
            Func<TMiddle, int> foreignKeyFunc1, Func<TMiddle, int> foreignKeyFunc2)
            where TType : class
        {
            await SelectCollectionAsync(propertyName, mdQueryFunc, queryFunc, foreignKeyFunc1, foreignKeyFunc2, x => x);
        }

        public async Task SelectCollectionAsync<TMiddle, TType, TResult>(string propertyName,
            Func<IQueryable<TEntity>, IQueryable<TMiddle>> mdQueryFunc, Func<IQueryable<TMiddle>, IQueryable<TType>> queryFunc,
            Func<TMiddle, int> foreignKeyFunc1, Func<TMiddle, int> foreignKeyFunc2, Func<TType, TResult> valueFunc)
            where TType : class
        {
            if (propertyName == null)
            {
                throw new Exception("Tên thuộc tính không được null");
            }

            if (!_selected)
            {
                throw new Exception("Vui lòng gọi select base trước");
            }
            var type = typeof(TType);
            var idP = type.GetProperty("Id");

            if (idP == null)
            {
                throw new Exception("Bảng liên kết phải có thuộc tính Id");
            }

            var mdQuery = mdQueryFunc(_query);
            var mdList = await mdQuery.ToListAsync();

            var list = await queryFunc(mdQuery).ToListAsync();

            _list.ForEach(item =>
            {
                var mdIds = mdList.Where(x => Convert.ToInt32(item["Id"]) == foreignKeyFunc1(x))
                    .Select(x => foreignKeyFunc2(x)).ToList();

                var sublist = list.Where(x => mdIds.Contains(Convert.ToInt32(idP.GetValue(x))))
                    .Select(x => valueFunc(x)).Distinct().ToList();

                item[propertyName] = sublist;
            });
        }

        public List<Dictionary<string, object>> ToList()
        {
            return _list.Select(item => item.ToDictionary()).ToList();
        }
        public Dictionary<string, object> FirstOrDefault()
        {
            return _list.Select(item => item.ToDictionary()).FirstOrDefault();
        }

        public List<JObject> ToJsonList()
        {
            return _list.Select(item => JObject.FromObject(item.ToDictionary())).ToList();
        }

        public object ToJson()
        {
            var list = this.ToList();
            var str = JsonConvert.SerializeObject(list, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });

            return JsonConvert.DeserializeObject(str);
        }
    }
}
