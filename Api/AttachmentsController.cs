// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Rws.Models;

// namespace Rws.Api
// {
//     [Produces("application/json")]
//     [Route("api/attachments")]
//     public class AttachmentsController : BaseController
//     {
//         [HttpGet]
//         public async Task<IActionResult> GetList(string path, string accept = null, int offset = 0, int pagesize = 100)
//         {
//             var result = await uploadService.GetAttachmentsAsync(path, accept, offset, pagesize);
//             if (result != null)
//             {
//                 return Ok(new
//                 {
//                     total = result.Item1,
//                     items = result.Item2
//                 });

//             }
//             return Error("No directory specified.");
//         }


//         [HttpPost]
//         public async Task<IActionResult> Upload(UploadBody body)
//         {
//             var at = await uploadService.UploadFileAsync(body);

//             if (at != null)
//             {
//                 return Ok(at);
//             }

//             return Error("Upload file err");
//         }

//         [HttpGet("savefile")]
//         [AllowAnonymous]
//         public async Task<IActionResult> SaveFileFromUrl(string url)
//         {
//             var at = await uploadService.CopyFileFromUrl(url);

//             if (at != null)
//             {
//                 return Ok(at);
//             }

//             return Error("Save file from url err");
//         }



//         [HttpGet("{id}")]
//         public async Task<IActionResult> Download(int id)
//         {
//             var found = await db.Attachments.FindAsync(id);
//             if (found != null)
//             {
//                 if (System.IO.File.Exists(environment.WebRootPath + found.Url))
//                 {
//                     var str = System.IO.File.OpenRead(environment.WebRootPath + found.Url);
//                     Response.Headers["Content-Disposition"] = string.Format("attachment; filename=\"{0}.{1}\"", found.Title, found.Extension);
//                     return File(str, found.Type);
//                 }
//                 return NotFound(new { error = "File not found" });
//             }
//             return NotFound(new { error = "File not found" });
//         }

//         [HttpDelete("{id}")]
//         public async Task<IActionResult> Delete(int id)
//         {
//             var found = await db.Attachments.FindAsync(id);
//             if (found != null)
//             {
//                 uploadService.DeleteFileByUrl(found.Url);
//                 uploadService.DeleteFileByUrl(found.Thumbnail);
//                 db.Attachments.Remove(found);
//                 await db.SaveChangesAsync();

//                 return Success();
//             }
//             return NotFound(new { error = "File not found" });
//         }

//         [HttpDelete]
//         public IActionResult DeleteByUrl(string url)
//         {
//             if (!string.IsNullOrWhiteSpace(url))
//             {
//                 uploadService.DeleteFileByUrl(url);
//                 return Success();
//             }
//             return Error("The url parameter cannot be null");
//         }
//     }


// }
