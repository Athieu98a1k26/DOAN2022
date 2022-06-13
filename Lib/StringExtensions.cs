using System;
using System.Text;
using System.Text.RegularExpressions;

namespace Rws
{
    public static class StringExtensions
    {
        /// <summary>
        /// Like Substring
        /// </summary>
        public static string Excerpt(this string input, int Length, string MorText = "...")
        {
            if (string.IsNullOrWhiteSpace(input)) return string.Empty;

            if (input.Length > Length)
            {
                input = input.Remove(Length) + MorText;
            }
            return input;
        }

        /// <summary>
        /// Convert String To Alphanumeric String
        /// </summary>
        public static string Sanitize(this string input, string joinstr = "-")
        {
            if (string.IsNullOrWhiteSpace(input)) return string.Empty;

            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = input.Trim().Normalize(NormalizationForm.FormD);

            temp = regex.Replace(temp, string.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D').Trim();

            regex = new Regex(@" |\.|,");

            temp = regex.Replace(temp, joinstr);

            if (!string.IsNullOrEmpty(joinstr))
            {
                temp = temp.Replace(joinstr + joinstr, joinstr);
            }

            temp = temp.Replace("--", "-").Replace("__", "_").ToLower();

            regex = new Regex(@"[^a-z0-9-_ ]");

            return regex.Replace(temp, string.Empty);
        }

        /// <summary>
        /// Convert String To Unsign String
        /// </summary>
        public static string ToUnsign(this string input, bool alphaNumericOnly = true)
        {
            if (string.IsNullOrWhiteSpace(input)) return string.Empty;

            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = input.ToString().Normalize(NormalizationForm.FormD);

            temp = regex.Replace(temp, string.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D').Trim();

            temp = temp.Replace("  ", " ");

            if (alphaNumericOnly)
            {
                regex = new Regex(@"[^a-zA-Z0-9 ]");

                return regex.Replace(temp, string.Empty);
            }

            return temp;
        }



        public static string UpperFirstLetter(this string input)
        {
            if (string.IsNullOrWhiteSpace(input)) return string.Empty;

            if (input.Length == 1) return input.ToUpper();

            return input[0].ToString().ToUpper() + input.Substring(1);
        }


        public static string LowerFirstLetter(this string input)
        {
            if (string.IsNullOrWhiteSpace(input)) return string.Empty;

            if (input.Length == 1) return input.ToLower();

            return input[0].ToString().ToLower() + input.Substring(1);
        }


        public static string AddWhiteSpace(this string input)
        {
            if (string.IsNullOrWhiteSpace(input)) return string.Empty;

            return System.Text.RegularExpressions.Regex.Replace(input, "([^A-Z])([A-Z])", "$1 $2");
        }
    }
}