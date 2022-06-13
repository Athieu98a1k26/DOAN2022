using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rws.Data;
using Rws.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Rws.Services;
using Microsoft.AspNetCore.Authorization;

namespace Rws.Api
{
    [Produces("application/json")]
    [Route("api/account")]
    public class AccountController : BaseController
    {
        public AccountController()
        {
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetProfile()
        {
            var securityStamp = User.Claims
                .Where(c => c.Type == "AspNet.Identity.SecurityStamp")
                .Select(c => c.Value).FirstOrDefault();

            var username = User.Identity.Name;
            var query = db.Users.Where(user =>
                user.UserName == username &&
                user.Status == IdentityStatus.Active &&
                user.SecurityStamp == securityStamp
                // &&
                // user.LockoutEnd == null
                );

            var info = await FormatAccount(query).FirstOrDefaultAsync();
            if (info == null)
            {
                return Error("Account doesn't exist or password has been changed");
            }

            return Ok(info);
        }


        [HttpPut]
        [AllowAnonymous]
        public async Task<IActionResult> Update([FromBody] UserProfileBody body)
        {
            var uname = User.Identity.Name;
            var user = await db.Users.Where(u => u.UserName == uname).FirstOrDefaultAsync();

            if (user != null)
            {
                user.Email = body.Email;
                user.FullName = body.FullName;
                user.Description = body.Description;
                user.PhoneNumber = body.Phone;

                await db.SaveChangesAsync();


                return await GetProfile();
            }

            return Error("Account doesn't exist");
        }

        [HttpPost("password")]
        [AllowAnonymous]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordBody body)
        {
            if (body.NewPassword == body.RePassword)
            {
                var result = await userManager.ChangePasswordAsync(CurrentUser, body.Password, body.NewPassword);

                if (result.Succeeded)
                {
                    return Success();
                }
                return IdentityError(result);
            }

            return BadRequest("Incorrect password");
        }
    }
}