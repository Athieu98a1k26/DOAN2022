using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Rws.Controllers
{
    [RsAuthorize]
    public class BaseController : Controller
    {

        protected string HomeUrl(string path = null)
        {
            return Request.GetHomeUrl(path);
        }

        public override void OnActionExecuting(Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
        }
    }
}