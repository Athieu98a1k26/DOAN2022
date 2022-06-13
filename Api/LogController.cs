// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Security.Claims;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using Newtonsoft.Json;
// using Rws.Data;
// using Rws.Models;

// namespace Rws.Api
// {
//     [Produces("application/json")]
//     [Route("api/log")]
//     //[RsAuthorize(Caps = "Department.Manage")]

//     public class LogController : BaseController
//     {
//         [HttpGet]
//         // [RsAuthorize(Caps = "Log.Manage")]
//         public async Task<IActionResult> GetList(LogObject logObject = LogObject.All,
//           LogAction LogAction = LogAction.All, string range = null, int creator = -1,
//         int page = 1, int pagesize = 20)
//         {
//             var query = db.Logs.AsNoTracking();
//             if (logObject != LogObject.All)
//             {
//                 query = query.Where(item => item.Object == logObject);
//             }
//             if (LogAction != LogAction.All)
//             {
//                 query = query.Where(item => item.Action == LogAction);
//             }
//             if (creator > 0)
//             {
//                 query = query.Where(item => item.UserId == creator);
//             }
//             if (!String.IsNullOrWhiteSpace(range))
//             {
//                 var rangeArr = range.Split(new string[] { " - " }, StringSplitOptions.None);
//                 var from = Convert.ToDateTime(rangeArr.First().Trim());
//                 var to = Convert.ToDateTime(rangeArr.Last().Trim());

//                 query = query.Where(item => item.LogTime < to && item.LogTime > from);
//             }
//             var total = await query.CountAsync();

//             query = query.OrderByDescending(item => item.Id).Skip((page - 1) * pagesize).Take(pagesize);

//             var list = await FormatLog(query).ToListAsync();
//             return Ok(new
//             {
//                 list = list,
//                 total = total
//             });
//         }
//     }
// }