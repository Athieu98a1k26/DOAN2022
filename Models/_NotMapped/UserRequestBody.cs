using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;
using Rws.Models;

namespace Rws.Models
{
    // User model
    public class UserBody
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string FullName { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public string RePassword { get; set; }
        public string AgentId { get; set; }
        public IdentityStatus Status { get; set; }
        public int[] RoleIds { get; set; }
    }

    public class RoleBody
    {
        public int Id { get; set; }

        public int? ParentId { get; set; }
        public string PositionName { get; set; }
        public string Description { get; set; }
        public IdentityStatus Status { get; set; }
        public int? DepartmentId { get; set; }
    }

    public class UserProfileBody
    {
        public int Id { get; set; }

        [MaxLength(50, ErrorMessage = "Max length FirstName is 50")]
        public string FirstName { get; set; }

        [MaxLength(50, ErrorMessage = "Max length LastName is 50")]
        public string LastName { get; set; }

        [MaxLength(100, ErrorMessage = "Max length FullName is 100")]
        public string FullName { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public string Phone { get; set; }

        [MaxLength(500, ErrorMessage = "Max length Description is 500")]
        public string Description { get; set; }

        public DateTime? Birthdate { get; set; }

        public Gender Gender { get; set; }

        public JObject Metas { get; set; }
    }

    public class UserMetasBody
    {
        public JObject Metas { get; set; }
    }

    public class LogLogin
    {
        public bool IsBo { get; set; } = false;
    }

    public class ChangePasswordBody
    {
        public string Password { get; set; }

        public string NewPassword { get; set; }

        public string RePassword { get; set; }
    }

    public class ResetPasswordBody
    {
        public string Email { get; set; }

        public string Code { get; set; }

        public string NewPassword { get; set; }

        public string RePassword { get; set; }
    }

    public class LoginViewModel
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public bool Remember { get; set; }

        public bool Mobile { get; set; }
    }

    // Upload model
    public class UploadBody
    {
        public UploadBody()
        {
            Path = DateTime.Now.ToString("yyyy/MM");
            CreateThumbnail = true;
            InsertDb = true;
        }

        public IFormFile File { get; set; }
        public string Path { get; set; }
        public bool Overwrite { get; set; }
        public bool CreateThumbnail { get; set; }
        public bool InsertDb { get; set; }
        public string ChangeNameTo { get; set; }

        public int? ImageWidth { get; set; }
        public int? ImageHeight { get; set; }

        public int? ThumbnailWidth { get; set; }
        public int? ThumbnailHeight { get; set; }

        public int? ImageQuality { get; set; }
        public bool Optimize { get; set; }

        public RsImageResizeMode ResizeMode { get; set; }
    }

    // Upload model
    public class SaveImageUrlBody
    {
        public SaveImageUrlBody()
        {
            Path = DateTime.Now.ToString("yyyy/MM");
            CreateThumbnail = false;
            InsertDb = false;
        }

        public string UrlDownload { get; set; }

        public string Path { get; set; }
        public bool Overwrite { get; set; }
        public bool CreateThumbnail { get; set; }
        public bool InsertDb { get; set; }
        public string ChangeNameTo { get; set; }

        public int? ImageWidth { get; set; }
        public int? ImageHeight { get; set; }

        public int? ThumbnailWidth { get; set; }
        public int? ThumbnailHeight { get; set; }

        public int? ImageQuality { get; set; }
        public bool Optimize { get; set; }

        public RsImageResizeMode ResizeMode { get; set; }
    }

    public class DepartmentBody
    {
        public int Id { get; set; }
        public int? BranchId { get; set; }

        [MaxLength(150, ErrorMessage = "Max length Description is 150")]
        [Required]
        public string Name { get; set; }
        public int? ParentId { get; set; }

        [MaxLength(300, ErrorMessage = "Max length Description is 300")]
        public string Description { get; set; }
        public DepartmentStatus Status { get; set; }
    }

    // Other ...
}