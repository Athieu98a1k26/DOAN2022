using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Rws
{
    public static class Functions
    {
        public static BType DownCast<BType>(this object obj)
        {
            try
            {
                var serializedAnimal = JsonConvert.SerializeObject(obj);
                return JsonConvert.DeserializeObject<BType>(serializedAnimal);
            }
            catch
            {
                return default(BType);
            }
        }

        // public static string GetDisplayName (this Enum obj) {
        //     try {
        //         if (obj == null) return "";

        //         var type = obj.GetType ();
        //         var enumType = Nullable.GetUnderlyingType (type) ?? type;

        //         string name = Enum.GetName (enumType, obj);

        //         var display_attr = enumType.GetMember (name).First ().GetCustomAttributes (typeof (DisplayAttribute), false) as DisplayAttribute[];

        //         if (display_attr != null && display_attr.Length > 0) {
        //             return display_attr[0].Name;
        //             } else {
        //             return name;
        //         }

        //     } catch {
        //         return "--";
        //     }
        // }
    }
}