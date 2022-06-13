// using System;
// using System.Collections.Generic;
// using System.IO;
// using System.Linq;
// using System.Net;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Hosting;
// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.StaticFiles;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Options;
// using Rws.Data;
// using Rws.Lib;
// using Rws.Models;

// namespace Rws.Services
// {
//     public class UploadService
//     {
//         string rootPath = "";

//         UploadImageConfig uploadConfig;

//         ApplicationDbContext db;
//         IHttpContextAccessor httpContextAccessor;

//         public IWebHostEnvironment Env { get; }
//         public IOptionsSnapshot<AppSettings> AppSettings { get; }

//         public UploadService(
//             IWebHostEnvironment env, ApplicationDbContext db,
//             IHttpContextAccessor httpContextAccessor, IOptionsSnapshot<AppSettings> appSettings)
//         {
//             this.rootPath = env.WebRootPath.Replace("\\", "/").TrimEnd('/');
//             this.uploadConfig = appSettings.Value.UploadImageConfig ?? new UploadImageConfig();
//             Env = env;
//             this.db = db;
//             this.httpContextAccessor = httpContextAccessor;
//             AppSettings = appSettings;
//         }

//         public string GetUrl(string path)
//         {
//             return httpContextAccessor.HttpContext.Request.GetHomeUrl(path);
//         }

//         public string GetUrl(Attachment at)
//         {
//             if (at != null)
//             {
//                 return GetUrl(at.Url);
//             }

//             return null;
//         }

//         public string GetFullPath(string basepath)
//         {
//             return rootPath + basepath;
//         }

//         public string GetBasePath(string path)
//         {
//             path = path?.Replace("//", "/")?.Trim('/');

//             return "/uploads/" + path + (System.IO.Path.HasExtension(path) ? "" : "/");
//         }

//         public async Task<Tuple<int, List<Attachment>>> GetAttachmentsAsync(string path, string accept, int offset = 0, int pagesize = 100)
//         {
//             if (!string.IsNullOrWhiteSpace(path))
//             {
//                 path = "%" + GetBasePath(path) + "%";

//                 var query = db.Attachments.Where(item => item.Url.Contains(path));

//                 if (!string.IsNullOrWhiteSpace(accept))
//                 {
//                     var filters = accept.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Select(item => item.Trim());

//                     if (!filters.Any(item => item == "*"))
//                     {
//                         foreach (var filter in filters)
//                         {
//                             if (filter.Contains("/"))
//                             {
//                                 var ss = filter.Replace("*", "");
//                                 query = query.Where(item => item.Type.Contains(ss));
//                             }
//                             else
//                             {
//                                 var ss = filter.Replace(".", "").ToLower();
//                                 query = query.Where(item => item.Extension == ss);
//                             }
//                         }
//                     }
//                 }

//                 var total = query.Count();

//                 query = query.OrderByDescending(item => item.CreateDate).Skip(offset).Take(pagesize);

//                 var list = await query.ToListAsync();

//                 return Tuple.Create(total, list);
//             }
//             return null;
//         }

//         public async Task<Attachment> GetAttachmentByIdAsync(int id)
//         {
//             var query = db.Attachments.Where(item => item.Id == id);
//             return await query.FirstOrDefaultAsync();
//         }

//         public async Task<Attachment> UploadFileAsync(UploadBody body)
//         {
//             if (body != null && body.File != null)
//             {
//                 string basePath = GetBasePath(body.Path);
//                 string fullPath = GetFullPath(basePath);

//                 if (fullPath.Contains(".."))
//                 {
//                     throw new Exception("Đường dẫn không hợp lệ");
//                 }

//                 if (!Directory.Exists(fullPath))
//                 {
//                     Directory.CreateDirectory(fullPath);
//                 }

//                 if (body.File.Length > 0)
//                 {
//                     var ext = Path.GetExtension(body.File.FileName).ToLower();
//                     var title = string.IsNullOrWhiteSpace(body.ChangeNameTo)
//                         ? Path.GetFileNameWithoutExtension(body.File.FileName)
//                         : body.ChangeNameTo;

//                     var filename = title.Sanitize() + ext;
//                     var url = basePath + filename;

//                     var fullname = rootPath + url;

//                     if (fullname.Contains(".."))
//                     {
//                         throw new Exception("Tên file không hợp lệ");
//                     }

//                     var i = 1;

//                     while (!body.Overwrite && System.IO.File.Exists(fullname))
//                     {
//                         url = basePath + filename.Replace(ext, "_" + ++i + ext);
//                         fullname = rootPath + url;
//                     }

//                     string thumbnail = null;

//                     if (RsMedia.IsType(body.File.FileName, RsMediaType.Image) && ext != ".gif")
//                     {
//                         using (var image = new RsImage(body.File.OpenReadStream()))
//                         {
//                             // nếu thiết lập kích thước ảnh
//                             if (body.ImageWidth.HasValue && body.ImageHeight.HasValue)
//                             {
//                                 image.Resize(body.ImageWidth.Value, body.ImageHeight.Value, body.ResizeMode)
//                                     .Save(fullname, body.ImageQuality);
//                             }
//                             // nếu không thiết lập kích thước và có tùy chọn optimize
//                             else if (body.Optimize)
//                             {
//                                 if (image.Width > uploadConfig.MaxImageWidth)
//                                 {
//                                     image.ResizeWidth(uploadConfig.MaxImageWidth).Save(fullname, body.ImageQuality);
//                                 }
//                                 else if (image.Height > uploadConfig.MaxImageHeight)
//                                 {
//                                     image.ResizeHeight(uploadConfig.MaxImageWidth).Save(fullname, body.ImageQuality);
//                                 }
//                                 else
//                                 {
//                                     image.Save(fullname, body.ImageQuality);
//                                 }
//                             }
//                             else
//                             {
//                                 image.Save(fullname, body.ImageQuality);
//                             }

//                             //nếu tạo thumbnail
//                             if (body.CreateThumbnail)
//                             {
//                                 int thumbw = body.ThumbnailWidth ?? uploadConfig.DefaultThumbnailWidth;
//                                 int thumbh = body.ThumbnailHeight ?? uploadConfig.DefaultThumbnailHeight;
//                                 string thumbsufix = string.Format("_{0}x{1}", thumbw, thumbh);

//                                 thumbnail = url.Replace(ext, thumbsufix + ext);
//                                 var thumbnailFile = fullname.Replace(ext, thumbsufix + ext);

//                                 image.Resize(thumbw, thumbh).Save(thumbnailFile, uploadConfig.DefaultThumbnailQuality);
//                             }
//                         }

//                     }
//                     else
//                     {
//                         using (var fileStream = new FileStream(fullname, FileMode.OpenOrCreate))
//                         {
//                             await body.File.CopyToAsync(fileStream);
//                         }
//                     }

//                     var at = new Attachment
//                     {
//                         Title = title,
//                         Size = body.File.Length,
//                         Thumbnail = thumbnail,
//                         Url = url,
//                         Type = body.File.ContentType,
//                         Extension = ext.Trim('.'),
//                         CreateDate = DateTime.Now
//                     };

//                     if (body.InsertDb)
//                     {
//                         await db.Attachments.AddAsync(at);

//                         await db.SaveChangesAsync();
//                     }

//                     return at;
//                 }
//             }

//             return null;
//         }

//         public async Task<Attachment> SaveFileFromUrl(SaveImageUrlBody body)
//         {
//             if (string.IsNullOrWhiteSpace(body.ChangeNameTo))
//             {
//                 return null;
//             }
//             Uri uri = new Uri(body.UrlDownload);

//             string fname = System.IO.Path.GetFileName(uri.LocalPath);

//             string basePath = GetBasePath(body.Path);
//             string fullPath = GetFullPath(basePath);

//             if (fullPath.Contains(".."))
//             {
//                 throw new Exception("Đường dẫn không hợp lệ");
//             }

//             if (!Directory.Exists(fullPath))
//             {
//                 Directory.CreateDirectory(fullPath);
//             }

//             WebClient webClient = new WebClient();
//             var stream = webClient.OpenRead(uri);
//             var contentType = webClient.ResponseHeaders["Content-Type"];

//             var ext = MimeTypeMap.GetExtension(contentType);
//             var title = body.ChangeNameTo;

//             var filename = title.Sanitize() + ext;
//             var url = basePath + filename;

//             var fullname = rootPath + url;
//             if (fullname.Contains(".."))
//             {
//                 throw new Exception("Tên file không hợp lệ");
//             }

//             var i = 1;

//             while (!body.Overwrite && System.IO.File.Exists(fullname))
//             {
//                 url = basePath + filename.Replace(ext, "_" + ++i + ext);
//                 fullname = rootPath + url;
//             }

//             string thumbnail = null;

//             if (RsMedia.IsType(filename, RsMediaType.Image) && ext != ".gif")
//             {
//                 using (var image = new RsImage(stream))
//                 {
//                     // nếu thiết lập kích thước ảnh
//                     if (body.ImageWidth.HasValue && body.ImageHeight.HasValue)
//                     {
//                         image.Resize(body.ImageWidth.Value, body.ImageHeight.Value, body.ResizeMode)
//                             .Save(fullname, body.ImageQuality);
//                     }
//                     // nếu không thiết lập kích thước và có tùy chọn optimize
//                     else if (body.Optimize)
//                     {
//                         if (image.Width > uploadConfig.MaxImageWidth)
//                         {
//                             image.ResizeWidth(uploadConfig.MaxImageWidth).Save(fullname, body.ImageQuality);
//                         }
//                         else if (image.Height > uploadConfig.MaxImageHeight)
//                         {
//                             image.ResizeHeight(uploadConfig.MaxImageWidth).Save(fullname, body.ImageQuality);
//                         }
//                         else
//                         {
//                             image.Save(fullname, body.ImageQuality);
//                         }
//                     }
//                     else
//                     {
//                         image.Save(fullname, body.ImageQuality);
//                     }

//                     //nếu tạo thumbnail
//                     if (body.CreateThumbnail)
//                     {
//                         int thumbw = body.ThumbnailWidth ?? uploadConfig.DefaultThumbnailWidth;
//                         int thumbh = body.ThumbnailHeight ?? uploadConfig.DefaultThumbnailHeight;
//                         string thumbsufix = string.Format("_{0}x{1}", thumbw, thumbh);

//                         thumbnail = url.Replace(ext, thumbsufix + ext);
//                         var thumbnailFile = fullname.Replace(ext, thumbsufix + ext);

//                         image.Resize(thumbw, thumbh).Save(thumbnailFile, uploadConfig.DefaultThumbnailQuality);
//                     }
//                 }

//             }
//             else
//             {
//                 webClient.DownloadFile(uri, fullname);
//             }

//             var at = new Attachment
//             {
//                 Title = title,
//                 Size = Convert.ToInt64(webClient.ResponseHeaders["Content-Length"]),
//                 Thumbnail = thumbnail,
//                 Url = url,
//                 Type = contentType,
//                 Extension = ext.Trim('.'),
//                 CreateDate = DateTime.Now
//             };

//             if (body.InsertDb)
//             {
//                 await db.Attachments.AddAsync(at);

//                 await db.SaveChangesAsync();
//             }

//             return at;

//         }

//         public async Task<Attachment> CopyFileFromUrl(string url)
//         {
//             string basePath = GetBasePath("download");
//             string fullPath = GetFullPath(basePath);

//             if (fullPath.Contains(".."))
//             {
//                 throw new Exception("Đường dẫn không hợp lệ");
//             }

//             if (!Directory.Exists(fullPath))
//             {
//                 Directory.CreateDirectory(fullPath);
//             }

//             try
//             {
//                 string fName = Path.GetFileName(url);
//                 FileInfo fi = new FileInfo(url);

//                 // Use the Path.Combine method to safely append the file name to the path.
//                 // Will overwrite if the destination file already exists.
//                 File.Copy(url, Path.Combine(fullPath, fName), true);
//                 new FileExtensionContentTypeProvider().TryGetContentType(Path.Combine(fullPath, fName), out string contentType);
//                 var at = new Attachment
//                 {
//                     Title = fName,
//                     Size = fi.Length,
//                     Url = basePath + fName,
//                     Type = contentType,
//                     Extension = fi.Extension,
//                     CreateDate = DateTime.Now
//                 };

//                 await db.Attachments.AddAsync(at);

//                 await db.SaveChangesAsync();
//                 return at;
//             }

//             catch (DirectoryNotFoundException dirNotFound)
//             {
//                 Console.WriteLine(dirNotFound.Message);
//             }

//             return null;

//         }

//         public void DeleteFile(string fullname)
//         {
//             if (fullname.Contains("..") || !fullname.Contains("/uploads"))
//             {
//                 throw new Exception("Đường dẫn không hợp lệ");
//             }

//             if (System.IO.File.Exists(fullname))
//             {
//                 try
//                 {
//                     System.IO.File.Delete(fullname);
//                 }
//                 catch { }
//             }
//         }

//         public void DeleteFileByUrl(string url)
//         {
//             DeleteFile(rootPath + url);
//         }
//     }
// }
