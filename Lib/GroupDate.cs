using System;
using System.Collections.Generic;
using Rws.Models;
using Rws.Helpers;
namespace Rws.Lib
{

    #region Date (Hàm tách ngày tháng thành các group theo loại)
    public class GroupDate
    {

        public List<DateGroup> GetGroupDate(DateTime start, DateTime end)
        {
            end = end.EndOfDay();

            List<DateGroup> data = new List<DateGroup>();
            switch (TypeGroupDate(start, end))
            {
                case "Year":
                    data = GetGroupDateYear(start, end);
                    break;
                case "Month":
                    data = GetGroupDateMonth(start, end);
                    break;
                case "Week":
                    data = GetGroupDateWeek(start, end);
                    break;
                case "Day":
                    data = GetGroupDateDay(start, end);
                    break;
                default:
                    break;
            }
            return data;
        }

        /// <summary>
        /// Loại Group cho Thời gian
        /// </summary>
        /// <returns></returns>
        public string TypeGroupDate(DateTime start, DateTime end)
        {
            var year = end.Year - start.Year;
            if (year < 0)
                return "";
            if (year > 2)
                return "Year";
            else
            {
                var day = (end - start).TotalDays;
                if (day > 60)
                    return "Month";
                else if (day > 7)
                    return "Week";
                else
                    return "Day";
            }
        }

        public List<DateGroup> GetGroupDateYear(DateTime start, DateTime end)
        {
            List<DateGroup> data = new List<DateGroup>();
            var next = start;
            while (next <= end)
            {
                next = new DateTime(start.Year, 12, DateTime.DaysInMonth(start.Year, 12));
                if (next >= end)
                {
                    data.Add(new DateGroup { TypeGroup = "Year", StartDate = start, EndDate = end });
                    break;
                }
                else
                    data.Add(new DateGroup { TypeGroup = "Year", StartDate = start, EndDate = next });
                start = next.AddDays(1);
            }
            return data;
        }
        public List<DateGroup> GetGroupDateMonth(DateTime start, DateTime end)
        {
            List<DateGroup> data = new List<DateGroup>();
            var next = start;
            while (next <= end)
            {
                next = new DateTime(start.Year, start.Month, DateTime.DaysInMonth(start.Year, start.Month));
                if (next >= end)
                {
                    data.Add(new DateGroup { TypeGroup = "Month", StartDate = start, EndDate = end });
                    break;
                }
                else
                    data.Add(new DateGroup { TypeGroup = "Month", StartDate = start, EndDate = next });
                start = next.AddDays(1);
            }
            return data;
        }
        public List<DateGroup> GetGroupDateWeek(DateTime start, DateTime end)
        {
            List<DateGroup> data = new List<DateGroup>();
            var next = start;
            while (next <= end)
            {
                next = GetLastDayOfWeek(start);
                if (next >= end)
                {
                    data.Add(new DateGroup { TypeGroup = "Week", StartDate = start, EndDate = end });
                    break;
                }
                else
                    data.Add(new DateGroup { TypeGroup = "Week", StartDate = start, EndDate = next });
                start = next.AddDays(1);
            }
            return data;
        }

        public DateTime GetLastDayOfWeek(DateTime date)
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
        public List<DateGroup> GetGroupDateDay(DateTime start, DateTime end)
        {
            List<DateGroup> data = new List<DateGroup>();
            data.Add(new DateGroup { TypeGroup = "Day", StartDate = start, EndDate = start });
            var next = start;
            for (int i = 0; i < (end - start).TotalDays; i++)
            {
                var nextday = next.AddDays(1);
                next = nextday;
                if ((next - end).TotalDays > 0) break;
                data.Add(new DateGroup { TypeGroup = "Day", StartDate = next, EndDate = next });
            }
            return data;
        }
    }
    public class DateGroup
    {
        /// <summary>
        /// Loại nhóm ngày tháng năm: Day, Week, Month, Year
        /// </summary>
        public string TypeGroup { get; set; }
        /// <summary>
        /// Ngày bắt đầu của Group
        /// </summary>
        public DateTime StartDate { get; set; }
        /// <summary>
        /// Ngày kết thúc của Group
        /// </summary>
        public DateTime EndDate { get; set; }
    }
    #endregion
}