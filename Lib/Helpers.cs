using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rws.Helpers
{
    public class FormatDate
    {
        /// <summary>
        /// FirstDay = Monday of week
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateTime GetFirstDayOfWeek(DateTime date)
        {
            var first = DateTime.Now;
            switch (date.DayOfWeek)
            {
                case DayOfWeek.Monday:
                    first = date;
                    break;
                case DayOfWeek.Tuesday:
                    first = date.AddDays(-1);
                    break;
                case DayOfWeek.Wednesday:
                    first = date.AddDays(-2);
                    break;
                case DayOfWeek.Thursday:
                    first = date.AddDays(-3);
                    break;
                case DayOfWeek.Friday:
                    first = date.AddDays(-4);
                    break;
                case DayOfWeek.Saturday:
                    first = date.AddDays(-5);
                    break;
                case DayOfWeek.Sunday:
                    first = date.AddDays(-6); ;
                    break;
            }
            return first;
        }

        /// <summary>
        /// Last day = SunDay of week
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateTime GetLastDayOfWeek(DateTime date)
        {
            var last = DateTime.Now;
            switch (date.DayOfWeek)
            {
                case DayOfWeek.Monday:
                    last = date.AddDays(6);
                    break;
                case DayOfWeek.Tuesday:
                    last = date.AddDays(5);
                    break;
                case DayOfWeek.Wednesday:
                    last = date.AddDays(4);
                    break;
                case DayOfWeek.Thursday:
                    last = date.AddDays(3);
                    break;
                case DayOfWeek.Friday:
                    last = date.AddDays(2);
                    break;
                case DayOfWeek.Saturday:
                    last = date.AddDays(1);
                    break;
                case DayOfWeek.Sunday:
                    last = date;
                    break;
            }
            return last;
        }

        public static DateTime GetFirstDayOfMonth(DateTime date)
        {
            if (date.ToString("dd") == "01" || date.ToString("dd") == "1")
                return date;
            return new DateTime(date.Year, date.Month, 1);
        }
        public static DateTime GetLastDayOfMonth(DateTime date)
        {
            return new DateTime(date.Year,
                date.Month,
                DateTime.DaysInMonth(date.Year,
                    date.Month));
        }
    }
    public static class DateTimeHelper
    {
        public static DateTime EndOfDay(this DateTime dateTime)
        {
            return dateTime.Date.AddDays(1).AddTicks(-1);
        }
        public static DateTime StartOfDay(this DateTime dateTime)
        {
            return dateTime.Date.AddDays(-1).AddTicks(1);
        }
    }
}