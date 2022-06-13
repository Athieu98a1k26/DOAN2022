// using System;
// using System.Collections.Generic;
// using System.Collections.Specialized;
// using System.ComponentModel;
// using System.ComponentModel.DataAnnotations;
// using System.Linq;
// using System.Net;
// using System.Net.Mail;
// using System.Net.Mime;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Hosting;
// using Microsoft.AspNetCore.Http;
// using Microsoft.EntityFrameworkCore;
// using Rws.Data;
// using Rws.Models;

// namespace Rws.Services
// {
//     public class EmailSender
//     {
//         ApplicationDbContext db;
//         IWebHostEnvironment environment;
//         protected OptionService options;

//         string homeUrl = "";

//         public EmailSender(IHttpContextAccessor httpContextAccessor, ApplicationDbContext db,
//             IWebHostEnvironment environment, OptionService options)
//         {
//             this.environment = environment;
//             this.db = db;
//             this.options = options;

//             this.homeUrl = httpContextAccessor.HttpContext.Request.GetHomeUrl();
//         }

//         public Task<string> SendEmailAsync(EmailSmtp smtp, string to, string subject, string message)
//         {
//             return SendEmailAsync(smtp, to, subject, message, null);
//         }

//         public Task<string> SendEmailAsync1(EmailSmtp smtp, string to, string subject, string message, IEnumerable<string> attachmentUrls)
//         {
//             MailMessage mail = new MailMessage();
//             SmtpClient SmtpServer = new SmtpClient();
//             string id = Guid.NewGuid().ToString("N");
//             mail.To.Add(to);
//             mail.From = new MailAddress(smtp.Email);
//             mail.Subject = subject;
//             mail.IsBodyHtml = true;
//             mail.Body = message;

//             SmtpServer.Host = smtp.Server;
//             int[] marks = new int[] { 25, 465, 587, 2525 };
//             if (marks.Contains(smtp.Port))
//             {
//                 SmtpServer.Port = smtp.Port;
//                 SmtpServer.EnableSsl = false;
//             }
//             SmtpServer.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
//             try
//             {
//                 Task.Run(() => SmtpServer.SendAsync(mail, id));
//                 return Task.FromResult(id);
//             }
//             catch (Exception)
//             {
//                 throw new Exception();
//             }
//         }

//         public Task<string> SendEmailAsync(EmailSmtp smtp, string to, string subject, string message, IEnumerable<string> attachmentUrls)
//         {
//             MailMessage msg = new MailMessage();
//             msg.From = new MailAddress(smtp.Email, smtp.Name.ToUnsign(), System.Text.Encoding.UTF8);
//             msg.To.Add(to);
//             msg.Subject = subject;
//             msg.HeadersEncoding = System.Text.Encoding.UTF8;
//             msg.BodyEncoding = System.Text.Encoding.UTF8;
//             msg.SubjectEncoding = System.Text.Encoding.Unicode;

//             string id = Guid.NewGuid().ToString("N");
//             string tracking = string.Format("<img width=\"1\" height=\"1\" src=\"{0}/email/track/{1}\" alt=\"\"/>", homeUrl, id);

//             msg.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(message, System.Text.Encoding.UTF8, MediaTypeNames.Text.Plain));
//             msg.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(message + tracking, System.Text.Encoding.UTF8, MediaTypeNames.Text.Html));

//             if (attachmentUrls != null)
//             {
//                 foreach (var at in attachmentUrls)
//                 {
//                     var name = System.IO.Path.GetFileName(at);
//                     msg.Attachments.Add(new System.Net.Mail.Attachment(environment.WebRootPath + at)
//                     {
//                         Name = name
//                     });
//                 }
//             }

//             SmtpClient smtpClient = new SmtpClient(smtp.Server, smtp.Port);

//             System.Net.NetworkCredential credentials = new System.Net.NetworkCredential(smtp.UserName, smtp.Password);
//             smtpClient.UseDefaultCredentials = true;
//             smtpClient.Credentials = credentials;
//             smtpClient.EnableSsl = smtp.EnableSsl;
//             smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
//             smtpClient.DeliveryFormat = SmtpDeliveryFormat.International;

//             msg.DeliveryNotificationOptions = DeliveryNotificationOptions.OnSuccess;

//             ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };

//             Task.Run(() => smtpClient.SendAsync(msg, id));

//             return Task.FromResult(id);
//         }
//     }

//     public class EmailSmtp
//     {
//         public int Id { get; set; }

//         [Required]
//         [Display(Name = "Máy chủ gửi thư")]
//         [MaxLength(300)]
//         public string Server { get; set; }

//         [Required]
//         [Display(Name = "Tên đăng nhập")]
//         [MaxLength(50)]
//         public string UserName { get; set; }

//         [Required]
//         [Display(Name = "Tên người gửi")]
//         [MaxLength(50)]
//         public string Name { get; set; }

//         [Required]
//         [Display(Name = "Địa chỉ email")]
//         [MaxLength(50)]
//         public string Email { get; set; }

//         [Required]
//         [Display(Name = "Mật khẩu đăng nhập")]
//         [MaxLength(50)]
//         public string Password { get; set; }

//         [Required]
//         [Display(Name = "Cổng gửi thư")]
//         public int Port { get; set; }

//         [Display(Name = "Bảo mật SSL")]
//         public bool EnableSsl { get; set; }

//         [Display(Name = "Ngày tạo")]
//         public DateTime CreateDate { get; set; }

//         [Display(Name = "Người tạo")]
//         public int UserId { get; set; }
//     }
// }
