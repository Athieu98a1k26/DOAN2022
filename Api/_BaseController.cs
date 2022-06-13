using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Rws.Lib;
using Rws.Data;
using Rws.Models;
using Rws.Services;

namespace Rws.Api
{
    [RsAuthorize]
    [CustomExceptionFilter]
    public partial class BaseController : Controller
    {
        private ApplicationUser _currentUser = null;

        private int _currentUserId = 0;

        protected ApplicationDbContext db
        {
            get
            {
                return (ApplicationDbContext)HttpContext.RequestServices.GetService(typeof(ApplicationDbContext));
            }
        }
        protected UserManager<ApplicationUser> userManager
        {
            get
            {
                return (UserManager<ApplicationUser>)HttpContext.RequestServices.GetService(typeof(UserManager<ApplicationUser>));
            }
        }
        protected IWebHostEnvironment environment
        {
            get
            {
                return (IWebHostEnvironment)HttpContext.RequestServices.GetService(typeof(IWebHostEnvironment));
            }
        }
        // protected OptionService options
        // {
        //     get
        //     {
        //         return (OptionService)HttpContext.RequestServices.GetService(typeof(OptionService));
        //     }
        // }

        // protected UploadService uploadService
        // {
        //     get
        //     {
        //         return (UploadService)HttpContext.RequestServices.GetService(typeof(UploadService));
        //     }
        // }

        protected int CurrentUserId
        {
            get
            {
                if (_currentUserId == 0)
                {
                    _currentUserId = User.GetUserId();
                }
                if (_currentUserId == 0)
                {
                    return 1;
                }
                else
                {
                    return _currentUserId;
                }

            }
        }

        protected ApplicationUser CurrentUser
        {
            get
            {
                if (_currentUser == null)
                {
                    _currentUser = GetCurrentUser().Result;
                }
                return _currentUser;
            }
        }

        protected async Task<ApplicationUser> GetCurrentUser()
        {
            return await db.Users
                .Include(u => u.Roles)
                .Include(u => u.Claims)
                .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
        }

        /// <summary>
        /// Lấy branchId hiện tại, có thể null
        /// </summary>
        /// <returns></returns>

        protected bool UserHasCap(string cap, int? branchId = null)
        {
            if (User == null) return false;

            return User.Claims.Any(c => c.Type == "RsCap" && c.Value == cap);
        }

        protected JsonSerializerSettings JsonSettings = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        };

        protected IActionResult ModelError(string error = null)
        {
            var list = ModelState.Values.SelectMany(v =>
               v.Errors.Select(e => !string.IsNullOrWhiteSpace(e.ErrorMessage) ? e.ErrorMessage : (e.Exception != null ? e.Exception.Message : "Unknow error")));

            return BadRequest(new
            {
                error = error ?? "Error",
                message = string.Join("\n", list)
            });
        }

        protected IActionResult IdentityError(IdentityResult result, string error = null)
        {
            var list = result.Errors.Select(e =>
            {
                if (e.Description.Contains("Passwords must be"))
                {
                    return "Password need 6 character.";
                }
                if (e.Description.Contains("Email") && e.Description.Contains("already taken"))
                {
                    return "Email used.";
                }
                if (e.Description.Contains("User name") && e.Description.Contains("already taken"))
                {
                    return "Username used.";
                }
                if (e.Description.Contains("Incorrect password"))
                {
                    return "Incorrect password.";
                }
                if (e.Description.Contains("Invalid token"))
                {
                    return "Invalid token";
                }
                return e.Description;
            });

            return BadRequest(new
            {
                error = error ?? "Error",
                message = string.Join("\n", list)
            });
        }

        protected IActionResult Error(string message = null, string error = null)
        {
            return BadRequest(new
            {
                error = error ?? "Error",
                message = message
            });
        }

        protected IActionResult Success(string message = null)
        {
            return Ok(new
            {
                success = true,
                message = message ?? "Success"
            });
        }

        // protected void AddLog(int objectId, LogObject objectType, LogAction action, string content)
        // {
        //     if (User != null && User.Identity.IsAuthenticated)
        //     {
        //         AddLog(CurrentUserId, objectId, objectType, action, content);
        //     }
        // }

        // protected void AddLog(int userId, int objectId, LogObject objectType, LogAction action, string content)
        // {
        //     db.Logs.Add(new Log
        //     {
        //         LogTime = DateTime.Now,
        //         ObjectId = objectId,
        //         Object = objectType,
        //         Action = action,
        //         Content = content,
        //         UserId = userId,
        //     });

        //     db.SaveChanges();
        // }

        protected string HomeUrl(string path = "")
        {
            return Request.GetHomeUrl(path);
        }

        protected object JsonDecode(string value)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject(value);
        }

        protected TType JsonDecode<TType>(string value)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<TType>(value);
        }

        protected string JsonEncode(object value)
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(value);
        }

        protected string MD5Hash(string input)
        {
            using (var md5 = MD5.Create())
            {
                var result = md5.ComputeHash(Encoding.ASCII.GetBytes(input ?? ""));
                return Encoding.ASCII.GetString(result);
            }
        }
    }

    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var exception = context.Exception;
            context.HttpContext.Response.StatusCode = 400;
            context.Result = new JsonResult(GetException(context.Exception));
        }

        private object GetException(Exception ex)
        {
            if (ex == null) return null;

            return new
            {
                Error = "Error",
                Message = ex.Message,
                HelpLink = ex.HelpLink,
                Source = ex.Source,
                StackTrace = ex.StackTrace,
                Inner = GetException(ex.InnerException)
            };
        }
    }
}