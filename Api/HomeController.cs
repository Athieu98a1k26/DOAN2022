using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rws.Api
{
    [Route("home")]
    public class HomeController : BaseController
    {
        [HttpGet]
        [Route("get")]
        public string getData()
        {
            return "hello";
        }
    }
}
