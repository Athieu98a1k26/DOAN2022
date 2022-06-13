// using System;
// using System.Collections.Generic;
// using System.Linq;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.AspNetCore.Authorization;

// namespace Rws.Api
// {
//     [Produces("application/json")]
//     [Route("api/options")]
//     // [RsAuthorize(Caps = "Option.Manage")]
//     public class OptionsController : BaseController
//     {
//         [HttpGet]
//         [AllowAnonymous]
//         public IActionResult GetList()
//         {
//             // if (User.Identity.IsAuthenticated)
//             // {
//             return Ok(new Dictionary<string, object>(options.Items.Where(item => !item.Key.StartsWith("_"))));
//             // }
//             // return Ok(new Dictionary<string, object>());
//         }

//         [HttpPost]
//         [AllowAnonymous]
//         public IActionResult SetOption([FromBody] Dictionary<string, object> listOptions)
//         {
//             if (listOptions != null)
//             {
//                 foreach (var option in listOptions)
//                 {
//                     options.SetOption(option.Key, option.Value);
//                 }
//             }

//             return Success();
//         }

//         [HttpPost("{name}")]
//         // [AllowAnonymous]
//         public IActionResult SetOption(string name, [FromBody] dynamic value)
//         {
//             options.SetOption(name, value);

//             return Success();
//         }

//         [HttpGet("{name}")]
//         [RsAuthorize(Caps = "Public.Default")]
//         public IActionResult GetOption(string name)
//         {
//             if (User.Identity.IsAuthenticated)
//             {
//                 var key = options.Items.Where(item => item.Key.Contains("openall")).FirstOrDefault();
//                 return Ok(key.Value);
//             }
//             return Error();
//         }

//         [HttpPost("openall")]
//         [RsAuthorize(Caps = "Public.Default")]
//         public IActionResult SetOptionOpenall([FromBody] OpenAll value)
//         {
//             options.SetOption("openall", value);

//             return Success();
//         }

//     }

//     public class OpenAll
//     {
//         public string Pass { get; set; }
//     }
// }