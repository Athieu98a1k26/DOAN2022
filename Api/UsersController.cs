using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Rws.Data;
using Rws.Models;

namespace Rws.Api
{
    [Produces("application/json")]
    [Route("api/users")]
    // [RsAuthorize(Roles = "Administrators")]
    public class UsersController : BaseController
    {

        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly RoleManager<Role> roleManager;

        private string defaultLocale;

        public UsersController(RoleManager<Role> roleManager,
            IConfiguration config,
            SignInManager<ApplicationUser> signInManager)
        {
            this.roleManager = roleManager;
            this.signInManager = signInManager;

            defaultLocale = config.GetValue<string>("AppSettings:DefaultLocale", "vi");
        }

        // [RsAuthorize(Caps = "User.RootAdmin")]
        // [RsAuthorize(Caps = "User.Brand")]
        // [RsAuthorize(Caps = "User.Branch")]
        public IActionResult NonAction()
        {
            return null;
        }

        [HttpGet]

        // [RsAuthorize(Caps = "User.Manager")]
        [Route("details/{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var query = db.Users
            .Include(u => u.Roles)
            .ThenInclude(u => u.Role)
            .Where(u => u.Id == id).AsNoTracking();
            var user = await FormatUser(query).FirstOrDefaultAsync();
            if (user != null)
            {
                return Ok(user);
            }
            return Error();
        }

        [HttpGet]
        // [AllowAnonymous]

        // [RsAuthorize(Caps = "User.RootAdmin|User.Brand")]
        public async Task<IActionResult> GetList(
            int page = 1, int pagesize = 20, string search = "", IdentityStatus? status = null, int?[] role = null, bool forSelect = false)
        {
            var admin = User.IsInRole("Administrators");
            int uid = CurrentUserId;

            var query = db.Users.Where(i => i.UserName != "systemadmin" && (i.Status == IdentityStatus.Active || i.Status == IdentityStatus.Inactive)
            && (i.Roles.Any(r => r != null && r.Role.Name != "Administrators") || !i.Roles.Any())
            )
            .Include(c => c.Roles)
            .AsNoTracking();

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = '%' + search.Trim() + '%';
                query = query.Where(item =>
                EF.Functions.Like(item.FullName, search) ||
                EF.Functions.Like(item.UserName, search) ||
                EF.Functions.Like(item.Email, search) ||
                EF.Functions.Like(item.PhoneNumber, search));
            }

            if (status.HasValue)
            {
                query = query.Where(item => item.Status == status);
            }
            if (role != null && role.Any())
            {
                query = query.Where(x => x.Roles.Any(r => role.Contains(r.Role.Id)));
            }

            var total = await query.CountAsync();
            query = query.OrderBy(item => item.Status);

            query = query.Skip((page - 1) * pagesize).Take(pagesize);


            var list = await FormatUser(query).ToListAsync();

            if (page > 1 && list.Count == 0)
            {
                return await GetList(page - 1, pagesize, search);
            }

            return Ok(new
            {
                items = list,
                total = total
            });
        }

        [HttpPost]
        // [RsAuthorize(Caps = "User.RootAdmin|User.Brand")]
        // [RsAuthorize(Caps = "User.Create")]
        public async Task<IActionResult> Create([FromBody] UserBody user)
        {
            if (ModelState.IsValid)
            {
                if (string.IsNullOrWhiteSpace(user.FullName))
                {
                    user.FullName = user.Lastname + " " + user.Firstname;
                }

                var appUser = new ApplicationUser
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    PhoneNumber = user.Phone,
                    JoinDate = DateTime.Now,
                    Status = IdentityStatus.Active,
                    FullName = user.FullName,
                };

                var createResult = await userManager.CreateAsync(appUser, user.Password);

                if (!createResult.Succeeded)
                {
                    return IdentityError(createResult);
                }

                if (user.RoleIds != null)
                {
                    var roles = await db.Roles.Where(item => user.RoleIds.Contains(item.Id)).Select(item => item.Name).ToListAsync();
                    await userManager.AddToRolesAsync(appUser, roles);
                }

                // AddLog(appUser.Id, LogObject.User, LogAction.Create, "Add account " + appUser.FullName);

                return Ok(await FormatUser(db.Users.Where(item => item.Id == appUser.Id)).FirstOrDefaultAsync());
            }
            return ModelError();
        }

        [HttpPut("{id}")]
        // [RsAuthorize(Caps = "User.RootAdmin|User.Brand")]
        // [RsAuthorize(Caps = "User.Edit")]
        public async Task<IActionResult> Update(int id, [FromBody] UserBody user)
        {
            if (ModelState.IsValid)
            {
                if (string.IsNullOrWhiteSpace(user.FullName))
                {
                    user.FullName = user.Lastname + " " + user.Firstname;
                }

                var found = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(item => item.Id == id);

                bool changed = found.UserName != user.UserName || found.Status != user.Status;

                if (found != null)
                {
                    found.UserName = user.UserName;
                    found.Email = user.Email;
                    found.PhoneNumber = user.Phone;
                    found.FullName = user.FullName;
                    found.Status = user.Status;
                    found.ModifiedDate = DateTime.Now;

                    if (user.RoleIds != null)
                    {
                        var checkedRoles = await db.Roles.Where(r => user.RoleIds.Contains(r.Id)).Select(r => r.Id).ToListAsync();
                        var oldRoleIds = found.Roles.Select(r => r.RoleId).ToList();
                        var keepRoles = oldRoleIds.Where(r => checkedRoles.Contains(r)).ToList();
                        var removeRoles = found.Roles.Where(r => !checkedRoles.Contains(r.RoleId)).ToList();
                        var newRoles = checkedRoles.Where(r => !keepRoles.Contains(r)).ToList();

                        removeRoles.ForEach(r => found.Roles.Remove(r));

                        newRoles.ForEach(r => found.Roles.Add(new UserRole
                        {
                            RoleId = r,
                            UserId = found.Id
                        }));

                        changed = changed || removeRoles.Any() || newRoles.Any();
                    }

                    // AddLog(found.Id, LogObject.User, LogAction.Update, "Update account " + found.FullName);

                    await db.SaveChangesAsync();

                    await signInManager.RefreshSignInAsync(found);


                    if (!string.IsNullOrWhiteSpace(user.Password) && user.Password == user.RePassword)
                    {
                        var token = await userManager.GeneratePasswordResetTokenAsync(found);
                        await userManager.ResetPasswordAsync(found, token, user.Password);
                    }

                    return Ok(await FormatUser(db.Users.Where(item => item.Id == found.Id)).FirstOrDefaultAsync());
                }

                return Error("User doesn't exist");

            }
            return ModelError();
        }

        [HttpPut("reset-password/{id}")]
        // [RsAuthorize(Caps = "User.RootAdmin|User.Brand")]
        // [RsAuthorize(Caps = "User.ResetPassword")]
        public async Task<IActionResult> ResetPassword(int id, [FromBody] UserBody user)
        {
            if (ModelState.IsValid)
            {
                var found = await db.Users.FirstOrDefaultAsync(item => item.Id == id);
                if (found != null)
                {
                    if (!string.IsNullOrWhiteSpace(user.Password) && user.Password == user.RePassword)
                    {
                        var token = await userManager.GeneratePasswordResetTokenAsync(found);
                        var result = await userManager.ResetPasswordAsync(found, token, user.Password);
                        if (result.Succeeded)
                        {
                            // AddLog(found.Id, LogObject.User, LogAction.Update, found.FullName + " change password");
                            return Success();
                        }
                        return IdentityError(result);
                    }
                    return Error("Incorrect password");
                }
                return Error("User doesn't exist");
            }
            return ModelError();
        }

        [HttpDelete("{id}")]
        // [RsAuthorize(Caps = "User.RootAdmin|User.Brand")]
        // [RsAuthorize(Caps = "User.Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var found = await db.Users.FindAsync(id);
            if (id == 1 || found.UserName == "admin")
            {
                return Error("Can't delete account admin");
            }

            if (found != null)
            {
                try
                {
                    db.Users.Remove(found);

                    await db.SaveChangesAsync();
                    // AddLog(found.Id, LogObject.User, LogAction.Delete, "Delete account " + found.FullName);

                    return Success("Delete success");
                }
                catch
                {
                    db.Entry(found).State = EntityState.Unchanged;
                    found.Status = IdentityStatus.Deleted;
                    await db.SaveChangesAsync();

                    return Ok(new
                    {
                        success = true,
                        changeStatus = true,
                        status = IdentityStatus.Deleted,
                        message = "Changed to delete status"
                    });
                }
            }
            return Error("User doesn't exist");
        }
    }
}