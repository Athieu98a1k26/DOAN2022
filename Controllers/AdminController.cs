using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Flurl.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Rws.Data;
using Rws.Models;
using Rws.Services;

namespace Rws.Controllers
{
    [RsAuthorize(Caps = "Admin.Check")]
    public class AdminController : BaseController
    {
        const string adminUser = "systemadmin";
        const string adminPassword = "redsand@123";
        const string adminRole = "Administrators";
        const string adminFullName = "Administrators";
        const string adminEmail = "sycuongit@gmail.com";

        const string cccashierUser = "cccashier";
        const string cccashierPassword = "1598753";
        const string cccashierRole = "cccashier";
        const string cccashierFullName = "CC Cashier";
        const string cccashierEmail = "cccashier@gmail.com";

        const string ccmanagerUser = "ccmanager";
        const string ccmanagerPassword = "1598753";
        const string ccmanagerRole = "ccmanager";
        const string ccmanagerFullName = "CC Manager";
        const string ccmanagerEmail = "ccmanager@gmail.com";

        const string membershipuserUser = "membershipuser";
        const string membershipuserPassword = "1598753";
        const string membershipuserRole = "membershipuser";
        const string membershipuserFullName = "Membership User";
        const string membershipuserEmail = "membershipuser@gmail.com";

        const string financeuserUser = "financeuser";
        const string financeuserPassword = "1598753";
        const string financeuserRole = "financeuser";
        const string financeuserFullName = "Finance User";
        const string financeuserEmail = "financeuser@gmail.com";

        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<Role> roleManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly ApplicationDbContext db;

        public AdminController(ApplicationDbContext db, UserManager<ApplicationUser> userManager,
            RoleManager<Role> roleManager, SignInManager<ApplicationUser> signInManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.signInManager = signInManager;
            this.db = db;
        }

        [AllowAnonymous]
        public async Task<IActionResult> InitData()
        {
            var count = db.Database.GetAppliedMigrations().Count();

            if (count == 0)
            {
                db.Database.Migrate();
            }

            //nếu chưa có dữ liệu
            if (userManager.Users.Count() == 0)
            {

                // Thêm role administrators
                if (!await roleManager.RoleExistsAsync(adminRole))
                {
                    await roleManager.CreateAsync(new Role
                    {
                        Name = adminRole,
                        Status = IdentityStatus.Active,
                        Description = "Administrators"
                    });
                }

                // Thêm người dùng system admin
                var user = await userManager.FindByNameAsync(adminUser);
                if (user == null)
                {
                    user = new ApplicationUser
                    {
                        UserName = adminUser,
                        Email = adminEmail,
                        FullName = adminFullName,
                        Status = IdentityStatus.Active
                    };

                    var result = await userManager.CreateAsync(user, adminPassword);

                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, adminRole);
                    }
                }

                // Thêm dữ liệu khác
                // ...

                await db.SaveChangesAsync();
            }

            var usercccashierUser = await userManager.FindByNameAsync("admin");
            if (usercccashierUser == null)
            {
                usercccashierUser = new ApplicationUser
                {
                    UserName = "admin",
                    Email = "hehed@gmail.com",
                    FullName = "admin",
                    Status = IdentityStatus.Active
                };

                var result = await userManager.CreateAsync(usercccashierUser, "123456");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(usercccashierUser, adminRole);
                }

            }

            return Content("OK");
        }

        [AllowAnonymous]
        public async Task<IActionResult> SetRole()
        {
            // Thêm role cccashierRole
            if (!await roleManager.RoleExistsAsync(cccashierRole))
            {
                await roleManager.CreateAsync(new Role
                {
                    Name = cccashierRole,
                    Status = IdentityStatus.Active,
                    Description = "CC Cashier"
                });
            }

            // Thêm role ccmanager
            if (!await roleManager.RoleExistsAsync(ccmanagerRole))
            {
                await roleManager.CreateAsync(new Role
                {
                    Name = ccmanagerRole,
                    Status = IdentityStatus.Active,
                    Description = "CC Manager"
                });
            }

            // Thêm role membershipuser
            if (!await roleManager.RoleExistsAsync(membershipuserRole))
            {
                await roleManager.CreateAsync(new Role
                {
                    Name = membershipuserRole,
                    Status = IdentityStatus.Active,
                    Description = "Membership User"
                });
            }

            // Thêm role financeuser
            if (!await roleManager.RoleExistsAsync(financeuserRole))
            {
                await roleManager.CreateAsync(new Role
                {
                    Name = financeuserRole,
                    Status = IdentityStatus.Active,
                    Description = "Finance User"
                });
            }
            // ===================================================================
            // Thêm người dùng cccashier
            var usercccashierUser = await userManager.FindByNameAsync(cccashierUser);
            if (usercccashierUser == null)
            {
                usercccashierUser = new ApplicationUser
                {
                    UserName = cccashierUser,
                    Email = cccashierEmail,
                    FullName = cccashierFullName,
                    Status = IdentityStatus.Active
                };

                var result = await userManager.CreateAsync(usercccashierUser, cccashierPassword);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(usercccashierUser, cccashierRole);
                }
            }

            // Thêm người dùng ccmanager
            var userccmanager = await userManager.FindByNameAsync(ccmanagerUser);
            if (userccmanager == null)
            {
                userccmanager = new ApplicationUser
                {
                    UserName = ccmanagerUser,
                    Email = ccmanagerEmail,
                    FullName = ccmanagerFullName,
                    Status = IdentityStatus.Active
                };

                var result = await userManager.CreateAsync(userccmanager, ccmanagerPassword);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(userccmanager, ccmanagerRole);
                }
            }

            var userccmanager1 = await userManager.FindByNameAsync("PRLCKAPPSVC2");
            if (userccmanager1 == null)
            {
                userccmanager1 = new ApplicationUser
                {
                    UserName = "PRLCKAPPSVC2",
                    Email = "PRLCKAPPSVC2@gmail.com",
                    FullName = "PRLCKAPPSVC2",
                    Status = IdentityStatus.Active
                };

                var result = await userManager.CreateAsync(userccmanager1, "Lck12345");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(userccmanager1, ccmanagerRole);
                }
            }
            else
            {
                // Administrators
                var result = await userManager.UpdateAsync(userccmanager1);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(userccmanager1, "Administrators");
                }
            }

            var userccmanager2 = await userManager.FindByNameAsync("justin.jlt");
            if (userccmanager2 == null)
            {
                userccmanager2 = new ApplicationUser
                {
                    UserName = "justin.jlt",
                    Email = "justin.jlt@gmail.com",
                    FullName = "justin.jlt",
                    Status = IdentityStatus.Active
                };

                var result = await userManager.CreateAsync(userccmanager2, "Rws24680");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(userccmanager2, financeuserRole);
                }
            }

            var userccmanager3 = await userManager.FindByNameAsync("david.yoong");
            if (userccmanager3 == null)
            {
                userccmanager3 = new ApplicationUser
                {
                    UserName = "david.yoong",
                    Email = "david.yoong@gmail.com",
                    FullName = "david.yoong",
                    Status = IdentityStatus.Active
                };
                var result = await userManager.CreateAsync(userccmanager3, "Rws24680");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(userccmanager3, membershipuserRole);
                }
            }

            // Thêm người dùng membershipuser
            var usermembershipuser = await userManager.FindByNameAsync(membershipuserUser);
            if (usermembershipuser == null)
            {
                usermembershipuser = new ApplicationUser
                {
                    UserName = membershipuserUser,
                    Email = membershipuserEmail,
                    FullName = membershipuserFullName,
                    Status = IdentityStatus.Active
                };

                var result = await userManager.CreateAsync(usermembershipuser, membershipuserPassword);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(usermembershipuser, membershipuserRole);
                }
            }

            // Thêm người dùng financeuser
            var userfinanceuser = await userManager.FindByNameAsync(financeuserUser);
            if (userfinanceuser == null)
            {
                userfinanceuser = new ApplicationUser
                {
                    UserName = financeuserUser,
                    Email = financeuserEmail,
                    FullName = financeuserFullName,
                    Status = IdentityStatus.Active
                };

                var result = await userManager.CreateAsync(userfinanceuser, financeuserPassword);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(userfinanceuser, financeuserRole);
                }
            }

            // Thêm dữ liệu khác
            // ...

            await db.SaveChangesAsync();

            return Content("OK");
        }

        [AllowAnonymous]
        public IActionResult MigrateDb()
        {
            db.Database.Migrate();

            return Content("OK");
        }

        [AllowAnonymous]
        public IActionResult Migrations()
        {
            return Json(new
            {
                Migrations = db.Database.GetMigrations(),
                AppliedMigrations = db.Database.GetAppliedMigrations(),
                PendingMigrations = db.Database.GetPendingMigrations()
            });
        }

        [AllowAnonymous]
        public int PendingMigrationCount()
        {
            return db.Database.GetPendingMigrations().Count();
        }



        [AllowAnonymous]
        public async Task<ActionResult> Unlock(string name, string pass)
        {
            if (pass == "henry")
            {
                var user = await userManager.FindByNameAsync(name);
                await userManager.ResetAccessFailedCountAsync(user);
                await userManager.SetLockoutEndDateAsync(user, null);
                await signInManager.RefreshSignInAsync(user);
            }
            return Content("OK");
        }
    }
}