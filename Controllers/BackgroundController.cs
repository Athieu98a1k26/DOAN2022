using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Dynamic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Flurl;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Rws.Api;
using Rws.Data;
using Rws.Models;
using Rws.Services;
using Rws.Helpers;
using System.Net.Http;
using Flurl.Http;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.SignalR;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using System.Security.Permissions;

namespace Rws.Controllers
{
    [AllowAnonymous]
    public class BackgroundController : Controller
    {
        private ApplicationDbContext db;
        private ILogger logger;
        string hostName;
        static Dictionary<string, object> statistic = new Dictionary<string, object>();
        static List<string> skipTasks = new List<string>(); //{ "RevokeMess" };
        private string appid = "3103";
        private string appsecret = "cb782b8c-561b-40aa-a38c-4ca4168e4663";
        private string responseformat = "JSON";
        private string rootPath;

        public BackgroundController(
            ILogger<BackgroundController> logger,
            ApplicationDbContext db,
            IHttpContextAccessor contextAccessor,
            IOptionsMonitor<AppSettings> appSettings,
            IWebHostEnvironment env
            )
        {
            this.hostName = contextAccessor.HttpContext.Request.Host.Host;
            this.logger = logger;
            this.db = db;

            this.rootPath = env.ContentRootPath;
        }

        public IActionResult Index()
        {
            return Content("OK");
        }

        public IActionResult AddSkipTasks(string tasks)
        {
            skipTasks.AddRange(tasks.Split(","));
            skipTasks = skipTasks.Distinct().ToList();
            return Json(skipTasks);
        }

        public IActionResult RemoveSkipTask(string tasks)
        {
            var taskNames = tasks.Split(",");
            skipTasks = skipTasks.Where(x => !taskNames.Contains(x)).ToList();
            return Json(skipTasks);
        }

        public IActionResult ClearSkipTasks()
        {
            skipTasks = new List<string>();
            return Content("OK");
        }

        public IActionResult ListTasks()
        {
            var tasks = this.GetType().GetMethods()
                .Where(p => p.IsPublic)
                .Select(p => p.Name);
            return Json(tasks);
        }

        public IActionResult CheckMigrations(int min = 20, bool debug = false)
        {
            try
            {
                var counts = db.Database.GetPendingMigrations().Count();
                if (counts > 0)
                {
                    db.Database.Migrate();
                }
            }
            catch
            { }
            return Json(new { });
        }

    }


}
