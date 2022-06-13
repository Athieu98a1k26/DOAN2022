using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rws
{
    public static class RequestExtensions
    {
        public static bool IsAjaxRequest(this HttpRequest request)
        {
            if (request == null)
                throw new ArgumentNullException("request");

            if (request.Path.HasValue && request.Path.Value.Contains("/token"))
                return true;

            if (request.Headers != null)
                return request.Headers["X-Requested-With"] == "XMLHttpRequest" ||
                    request.Headers.ContainsKey("authorization");

            return false;
        }

        public static string GetHomeUrl(this HttpRequest request, string path = null)
        {
            if (request == null)
            {
                throw new ArgumentNullException("request");
            }

            var baseUrl = string.Format("{0}://{1}", request.Scheme, request.Host.ToString());

            return string.IsNullOrWhiteSpace(path) ? baseUrl : baseUrl + "/" + path.Trim('/');
        }
    }
}
