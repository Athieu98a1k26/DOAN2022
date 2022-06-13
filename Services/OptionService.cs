// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Net.Http;
// using System.Net.Http.Headers;
// using System.Threading.Tasks;
// using System.Web;
// using Microsoft.AspNetCore.Routing;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.Options;
// using Newtonsoft.Json;
// using Rws.Data;
// using Rws.Models;

// namespace Rws.Services
// {
//     public class OptionService
//     {
//         ApplicationDbContext db;

//         IDictionary<string, object> options = null;

//         AppSettings appSettings;

//         public OptionService(ApplicationDbContext db, IOptionsSnapshot<AppSettings> appSettingsSnapshot)
//         {
//             this.db = db;
//             this.appSettings = appSettingsSnapshot.Value;

//             this.GetAll();
//         }

//         public IDictionary<string, object> Items
//         {
//             get
//             {
//                 return options;
//             }
//         }

//         public object this[string key]
//         {
//             get
//             {
//                 return GetOption(key);
//             }
//         }

//         private void GetAll()
//         {
//             try
//             {
//                 var list = db.Options.ToList();

//                 //appSetings
//                 var allOptions = appSettings.ToDictionary(true);

//                 allOptions.Remove("authentication");

//                 //options
//                 list.ForEach(item =>
//                 {
//                     try
//                     {
//                         allOptions[item.Name] = Newtonsoft.Json.JsonConvert.DeserializeObject(item.Value);
//                     }
//                     catch
//                     {
//                         allOptions[item.Name] = item.Value;
//                     }
//                 });

//                 this.options = allOptions;
//             }
//             catch (Exception ex)
//             {
//                 var x = db.Database.GetDbConnection().ConnectionString;
//                 throw new Exception("OptionServiceGetAll: Một vài lần lỗi chỗ này", new Exception(x, ex));
//             }
//         }

//         public bool HasOption(string key)
//         {
//             return options.ContainsKey(key);
//         }

//         public object GetOption(string key, object defaultValue = null)
//         {
//             if (options.ContainsKey(key))
//             {
//                 return options[key];
//             }
//             return defaultValue;
//         }

//         public TType GetOption<TType>(string key)
//         {
//             return GetOption<TType>(key, default(TType));
//         }

//         public TType GetOption<TType>(string key, TType defaultValue)
//         {
//             var value = GetOption(key);

//             if (value == null) return defaultValue;

//             try
//             {
//                 return (TType)Convert.ChangeType(value, typeof(TType));
//             }
//             catch
//             {
//                 try
//                 {
//                     var stringValue = JsonConvert.SerializeObject(value);
//                     return JsonConvert.DeserializeObject<TType>(stringValue);
//                 }
//                 catch
//                 {
//                     return default(TType);
//                 }
//             }
//         }

//         public Option SetOption(string name, dynamic value)
//         {
//             if (value == null) return null;

//             var found = db.Options.Find(name);

//             if (found != null)
//             {
//                 found.Value = Newtonsoft.Json.JsonConvert.SerializeObject(value);
//                 db.SaveChanges();
//             }
//             else
//             {
//                 found = new Option
//                 {
//                     Name = name,
//                     Value = Newtonsoft.Json.JsonConvert.SerializeObject(value)
//                 };

//                 db.Options.Add(found);

//                 db.SaveChanges();
//             }

//             return found;
//         }
//     }
// }