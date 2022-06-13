using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Rws.Data;
using Rws.Helpers;
using Rws.Models;

namespace Rws.Api
{
    public partial class BaseController
    {
        protected IQueryable<object> FormatAccount(IQueryable<ApplicationUser> query)
        {
            var ipaddress = Request?.HttpContext?.Connection?.RemoteIpAddress?.ToString();
            return query.Select(item => new
            {
                ipaddress,
                Id = item.Id,
                UserName = item.UserName,
                Email = item.Email,
                JoinDate = item.JoinDate,
                ModifiedDate = item.ModifiedDate,
                LoginBO = item.LoginBO,
                LoginMC = item.LoginMC,
                Phone = item.PhoneNumber,
                Status = item.Status,
                FullName = item.FullName,
                Avatar = item.Avatar,
                Description = item.Description,
                Roles = item.Roles.Select(r => new
                {
                    Id = r.RoleId,
                    Name = r.Role.Name,
                    Status = r.Role.Status
                }).ToList(),
                Caps = item.Roles.Where(r => r.Role.Status == IdentityStatus.Active)
                   .SelectMany(r => r.Role.Claims.Where(cl => cl.ClaimType.Contains("RsCap"))
                      .Select(cl => cl.ClaimValue)).ToList()
            });
        }

        protected IQueryable<object> FormatUser(IQueryable<ApplicationUser> query)
        {
            var ipaddress = Request?.HttpContext?.Connection?.RemoteIpAddress?.ToString();
            return query.Select(item => new
            {
                ipaddress,
                Id = item.Id,
                UserName = item.UserName,
                Email = item.Email,
                JoinDate = item.JoinDate,
                ModifiedDate = item.ModifiedDate,
                LoginBO = item.LoginBO,
                LoginMC = item.LoginMC,
                Phone = item.PhoneNumber,
                Status = item.Status,
                FullName = item.FullName,
                Avatar = item.Avatar,
                Description = item.Description,
                Roles = item.Roles.Select(r => new
                {
                    Id = r.RoleId,
                    Name = r.Role.Name,
                    Status = r.Role.Status
                }).ToList()
            });
        }

        protected IQueryable<object> FormatRole(IQueryable<Role> query)
        {
            return query.Select(item => new
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Status = item.Status,
                Caps = item.Claims.Select(cl => cl.ClaimValue).ToList()
            });
        }

        // public IQueryable<Object> FormatLog(IQueryable<Log> query)
        // {
        //     return query.Select(item => new
        //     {
        //         Id = item.Id,
        //         Action = item.Action,
        //         Content = item.Content,
        //         LogTime = item.LogTime,
        //         Object = item.Object,
        //         ObjectId = item.ObjectId,
        //         UserId = item.UserId,
        //         UserName = item.User.UserName,
        //         UserFullName = item.User.FullName
        //     });
        // }
    }
}