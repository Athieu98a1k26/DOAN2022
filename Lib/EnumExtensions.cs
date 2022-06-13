using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Rws
{
    public static class EnumExtensions
    {
        public static string GetDisplayName(this Enum value)
        {
            try
            {
                if (value == null)
                {
                    return null;
                }

                var enumType = value.GetType();
                enumType = Nullable.GetUnderlyingType(enumType) ?? enumType;

                string name = Enum.GetName(enumType, value);

                var display_attr = enumType.GetMember(name).First()
                    .GetCustomAttributes(typeof(DisplayAttribute), false) as DisplayAttribute[];

                if (display_attr != null && display_attr.Length > 0)
                {
                    return display_attr[0].Name;
                }

                return name;
            }
            catch
            {
                return value.ToString();
            }
        }

        public static bool HasAnyFlag(this Enum value, Enum flags)
        {
            return
                value != null && ((Convert.ToInt32(value) & Convert.ToInt32(flags)) != 0);
        }
    }
}
