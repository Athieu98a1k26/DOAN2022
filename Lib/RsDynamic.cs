using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Dynamic;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Rws
{
    /// <summary>
    /// version 1.0
    /// latest modify: 28/4/2013
    /// </summary>
    public class RsDynamic : DynamicObject
    {
        private bool resolvePropertyName = false;
        private Dictionary<string, object> dictionary = new Dictionary<string, object>();

        public RsDynamic() { }

        public RsDynamic(bool autoResolvePropertyName)
        {
            resolvePropertyName = autoResolvePropertyName;
        }

        private string ResolveName(string name)
        {
            if (resolvePropertyName)
            {
                return name.UpperFirstLetter();
            }
            return name;
        }

        public override bool TryGetMember(GetMemberBinder binder, out object result)
        {
            string name = ResolveName(binder.Name);
            dictionary.TryGetValue(name, out result);
            return true;
        }

        public override bool TrySetMember(SetMemberBinder binder, object value)
        {
            string name = ResolveName(binder.Name);

            if (dictionary.ContainsKey(name))
            {
                dictionary[name] = value;
            }
            else
            {
                dictionary.Add(name, value);
            }
            return true;
        }

        public override bool TryDeleteMember(DeleteMemberBinder binder)
        {
            return Remove(binder.Name);
        }

        public override bool TryInvokeMember(InvokeMemberBinder binder, object[] args, out object result)
        {
            string name = ResolveName(binder.Name);
            if (dictionary.ContainsKey(name) && dictionary[name] is Delegate)
            {
                result = (dictionary[name] as Delegate).DynamicInvoke(args);
                return true;
            }
            return base.TryInvokeMember(binder, args, out result);
        }

        public object this[string name]
        {
            get
            {
                name = ResolveName(name);

                if (dictionary.ContainsKey(name))
                {
                    return dictionary[name];
                }
                return null;
            }
            set
            {
                name = ResolveName(name);

                if (dictionary.ContainsKey(name))
                {
                    dictionary[name] = value;
                }
                else
                {
                    dictionary.Add(name, value);
                }
            }
        }

        public bool HasMember(string name)
        {
            name = ResolveName(name);
            return dictionary.ContainsKey(name);
        }

        public T GetMemberValue<T>(string name)
        {
            var t = typeof(T);
            var value = this[name];

            if (t.IsGenericType && t.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
            {
                if (value == null)
                {
                    return default(T);
                }

                t = Nullable.GetUnderlyingType(t);
            }

            return (T)Convert.ChangeType(value, t);
        }

        public object GetMemberValue(string name, Type conversion)
        {
            var t = conversion;
            var value = this[name];

            if (t.IsGenericType && t.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
            {
                if (value == null)
                {
                    return null;
                }

                t = Nullable.GetUnderlyingType(t);
            }

            return Convert.ChangeType(value, t);
        }

        public bool Remove(string name)
        {
            name = ResolveName(name);

            if (dictionary.Remove(name))
            {
                return true;
            }
            return false;
        }

        public Dictionary<string, object> ToDictionary()
        {
            return this.dictionary;
        }

        public string ToJsonString(bool IgnoreNull = true)
        {
            if (IgnoreNull)
            {
                var list = dictionary.Where(item => item.Value != null);
                return list.Count() == 0 ? null :
                    JsonConvert.SerializeObject(list.ToDictionary(item => item.Key, item => item.Value), Newtonsoft.Json.Formatting.Indented, new IsoDateTimeConverter { DateTimeFormat = "yyyy-MM-dd HH:mm:ss.fff" });
            }
            else
            {
                return JsonConvert.SerializeObject(dictionary, Newtonsoft.Json.Formatting.Indented, new IsoDateTimeConverter { DateTimeFormat = "yyyy-MM-dd HH:mm:ss.fff" });
            }
        }

        public static RsDynamic ConvertFromJString(string jsonString)
        {
            if (jsonString == null) return null;
            return JsonConvert.DeserializeObject<RsDynamic>(jsonString, new IsoDateTimeConverter { DateTimeFormat = "yyyy-MM-dd HH:mm:ss.fff" });
        }
        public static RsDynamic ConvertFromJObject(Newtonsoft.Json.Linq.JObject obj)
        {
            if (obj == null) return null;
            return JsonConvert.DeserializeObject<RsDynamic>(obj.ToString(), new IsoDateTimeConverter { DateTimeFormat = "yyyy-MM-dd HH:mm:ss.fff" });
        }

    }

    public class RsDynamicCaseResolve : RsDynamic
    {
        public RsDynamicCaseResolve() : base(true) { }
    }
}
