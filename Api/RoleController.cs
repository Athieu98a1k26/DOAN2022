using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rws.Models;

namespace Rws.Api
{
    [Produces("application/json")]
    [Route("api/roles")]
    // [RsAuthorize(Roles = "Administrators")]
    public class RoleController : BaseController
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        private readonly RoleManager<Role> roleManager;

        public RoleController(RoleManager<Role> roleManager, IHttpContextAccessor httpContextAccessor)
        {
            this.roleManager = roleManager;
            this.httpContextAccessor = httpContextAccessor;
        }

        [NonAction]
        // kiosk dashboard
        [RsAuthorize(Caps = "Kiosk.ViewDeviceStatus")]
        [RsAuthorize(Caps = "Kiosk.ClickOnId")]
        // [RsAuthorize(Caps = "Kiosk.ViewConfigLog")]
        // [RsAuthorize(Caps = "Kiosk.ViewTransaction")]
        [RsAuthorize(Caps = "Kiosk.ViewCashStacker")]
        [RsAuthorize(Caps = "Kiosk.AllowChangeMaintenance")]
        [RsAuthorize(Caps = "Kiosk.ShutDownKiosk")]
        [RsAuthorize(Caps = "Kiosk.RebootKiosk")]
        // kiosk management
        [RsAuthorize(Caps = "Kiosk.Access.Config")]
        [RsAuthorize(Caps = "Kiosk.AccessKioskManagement")]
        [RsAuthorize(Caps = "Kiosk.Edit.Info")]
        [RsAuthorize(Caps = "Kiosk.EditUpdate.Payment")]
        // Audit Trail
        [RsAuthorize(Caps = "AuditTrail.View")]
        // [RsAuthorize(Caps = "AuditTrail.Filter")]
        [RsAuthorize(Caps = "AuditTrail.Download")]
        [RsAuthorize(Caps = "AuditTrail.ViewContent")]
        // [RsAuthorize(Caps = "AuditTrail.ViewCashStacker")]
        // global config
        [RsAuthorize(Caps = "Global.Access.Config")]
        [RsAuthorize(Caps = "Global.EditUpdate.Timeout")]
        [RsAuthorize(Caps = "Global.EditUpdate.Payment")]
        [RsAuthorize(Caps = "Global.EditUpdate.SMS")]
        [RsAuthorize(Caps = "Global.EditUpdate.Levy")]
        // Display Management
        [RsAuthorize(Caps = "DisplayManagement.Access")]
        [RsAuthorize(Caps = "DisplayManagement.EditUpdate.General")]
        [RsAuthorize(Caps = "DisplayManagement.EditUpdate.Enquire")]
        [RsAuthorize(Caps = "DisplayManagement.EditUpdate.SMS")]
        [RsAuthorize(Caps = "DisplayManagement.EditUpdate.Purchase")]
        // Manage Levies
        [RsAuthorize(Caps = "ManagementLevy.Access")]
        [RsAuthorize(Caps = "ManagementLevy.AddNew")]
        [RsAuthorize(Caps = "ManagementLevy.Edit")]
        [RsAuthorize(Caps = "ManagementLevy.EnableDisable")]
        [RsAuthorize(Caps = "ManagementLevy.Schedule")]
        // Notification Management
        [RsAuthorize(Caps = "Notification.Access")]
        [RsAuthorize(Caps = "Notification.EnableDisable")]
        [RsAuthorize(Caps = "Notification.Edit")]
        // Downstream Systems
        [RsAuthorize(Caps = "Downstream.Access")]
        [RsAuthorize(Caps = "Downstream.AllowMaintenance")]
        // User management
        [RsAuthorize(Caps = "UserManagement.Access")]
        // [RsAuthorize(Caps = "UserManagement.Search")]
        [RsAuthorize(Caps = "UserManagement.AddNew")]
        [RsAuthorize(Caps = "UserManagement.ViewUser")]
        [RsAuthorize(Caps = "UserManagement.EditUser")]
        [RsAuthorize(Caps = "UserManagement.EnableDisable")]
        [RsAuthorize(Caps = "UserManagement.Export")]
        [RsAuthorize(Caps = "UserManagement.EditUserRole")]
        [RsAuthorize(Caps = "UserManagement.EnableDisableUserRole")]
        // Transaction Listing

        [RsAuthorize(Caps = "Transaction.AccessReports")]
        // [RsAuthorize(Caps = "Transaction.Filter")]
        // [RsAuthorize(Caps = "Transaction.Search")]
        [RsAuthorize(Caps = "Transaction.Download")]
        // 
        [RsAuthorize(Caps = "Transaction.AccessCashCollection")]
        [RsAuthorize(Caps = "Transaction.AccessLevyKioskDetails")]
        [RsAuthorize(Caps = "Transaction.AccessOutstanding")]
        [RsAuthorize(Caps = "Transaction.AccessExceptional")]
        [RsAuthorize(Caps = "Transaction.AccessKioskTransactionDetail")]
        [RsAuthorize(Caps = "Transaction.AccessSummaryofSettledCash")]
        [RsAuthorize(Caps = "Transaction.AccessLevyKioskCreditCard")]
        // Transaction Detail
        [RsAuthorize(Caps = "TransactionDetail.AllowResolve")]

        // Management Console
        [RsAuthorize(Caps = "ManageConsole.AbleToLogin")]
        [RsAuthorize(Caps = "ManageConsole.PrintLast")]
        // Collection / Settlement
        [RsAuthorize(Caps = "CollectSetlement.Access")]
        [RsAuthorize(Caps = "CollectSetlement.AbleCommenceComplete")]
        [RsAuthorize(Caps = "CollectSetlement.AblePrint")]
        // Check Status of Devices
        [RsAuthorize(Caps = "CheckStatus.ViewCash")]
        [RsAuthorize(Caps = "CheckStatus.ViewScanner")]
        [RsAuthorize(Caps = "CheckStatus.ViewPrinter")]
        [RsAuthorize(Caps = "CheckStatus.ViewPayment")]
        [RsAuthorize(Caps = "CheckStatus.ViewLEDs")]
        [RsAuthorize(Caps = "CheckStatus.ViewNETs")]
        [RsAuthorize(Caps = "CheckStatus.AllowReload")]

        // Kiosk Config
        [RsAuthorize(Caps = "KioskConfig.AllowChange")]
        [RsAuthorize(Caps = "KioskConfig.ShutDown")]
        [RsAuthorize(Caps = "KioskConfig.Reboot")]
        // audittail
        [RsAuthorize(Caps = "AudittrailConsole.ViewAuditTrails")]

        // View Audit Trails of this kiosk
        public IActionResult NonAction()
        {
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            var query = db.Roles.Where(r => r.Name != "Administrators").OrderByDescending(item => item.Id).AsNoTracking();

            var list = await FormatRole(query).ToListAsync();

            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var query = db.Roles.Where(r => r.Id == id && r.Name != "Administrators").OrderByDescending(item => item.Id).AsNoTracking();

            var list = await FormatRole(query).FirstOrDefaultAsync();

            return Ok(list);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await db.Users.AnyAsync(item => item.Status == IdentityStatus.Active && item.Roles.Any(r => r.RoleId == id)))
            {
                return Error("Can't delete, this permission has been assigned to the user");
            }

            var found = await db.Roles.FindAsync(id);
            if (found != null)
            {
                db.Roles.Remove(found);
                await db.SaveChangesAsync();
                return Success();
            }

            return Error("Object does not exist");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Role role)
        {
            if (ModelState.IsValid)
            {
                if (string.IsNullOrWhiteSpace(role.Name))
                {
                    return Error("Role name error");
                }

                if (db.Roles.Any(r => r.Name == role.Name && r.Id != id))
                {
                    return Error("The role name already exists");
                }

                var obj = await db.Roles.FindAsync(id);
                obj.Name = role.Name;
                obj.Description = role.Description;
                obj.NormalizedName = role.Name.ToUpper();
                obj.Status = role.Status;

                await db.SaveChangesAsync();

                var result = await FormatRole(db.Roles.Where(r => r.Id == id)).FirstOrDefaultAsync();

                return Ok(result);
            }
            return ModelError();
        }

        [ResponseCache(Duration = 30)]
        [HttpGet("capabilities")]
        public IActionResult GetCaps()
        {
            return Ok(GetAllCaps());
        }

        [NonAction]
        public static IEnumerable<string> GetAllCaps()
        {
            Assembly asm = Assembly.GetAssembly(typeof(Rws.Program));
            // cap of action
            var list = asm.GetTypes()
                .Where(type => typeof(Rws.Api.BaseController).IsAssignableFrom(type))
                .SelectMany(type => type.GetMethods(BindingFlags.Instance | BindingFlags.DeclaredOnly | BindingFlags.Public))
                .OrderBy(x => x.DeclaringType.Name).ThenBy(x => x.Name)
                .SelectMany(x => x.GetCustomAttributes<RsAuthorizeAttribute>().Select(a => a.Caps))
                .Where(x => !string.IsNullOrWhiteSpace(x))
                .SelectMany(x => x.Split(new char[] { '|', ',' }, StringSplitOptions.RemoveEmptyEntries))
                .Select(x => x.Trim());

            // cap of controller
            var list2 = asm.GetTypes()
                .Where(type => typeof(Rws.Api.BaseController).IsAssignableFrom(type))
                .SelectMany(x => x.GetCustomAttributes<RsAuthorizeAttribute>().Select(a => a.Caps))
                .Where(x => !string.IsNullOrWhiteSpace(x))
                .SelectMany(x => x.Split(new char[] { '|', ',' }, StringSplitOptions.RemoveEmptyEntries))
                .Select(x => x.Trim());


            list = list.Concat(list2).Distinct()
                .OrderBy(item =>
                    item.Contains("Manage") ? 1 :
                    item.Contains("Create") ? 2 :
                    item.Contains("Edit") ? 3 :
                    item.Contains("Delete") ? 4 :
                    item.Contains("ViewTab") ? 5 : 6)
                .ToList();

            return list;
        }

        [HttpPut("{id}/capabilities")]
        // [RsAuthorize(Caps = "Administrators")]
        public async Task<IActionResult> UpdateCaps(int id, [FromBody] string[] caps)
        {
            var claimns = await db.RoleClaims.Where(rc => rc.RoleId == id).ToListAsync();
            caps = caps ?? new string[0];

            var oldCaps = claimns.Select(cl => cl.ClaimValue).ToList();
            var removeCaps = oldCaps.Where(c => !caps.Contains(c)).ToList();
            var newCaps = caps.Where(c => !oldCaps.Contains(c)).ToList();

            var removeClaims = claimns.Where(item => removeCaps.Contains(item.ClaimValue)).ToList();

            removeClaims.ForEach(item => db.RoleClaims.Remove(item));

            newCaps.ForEach(cap =>
            {
                db.RoleClaims.Add(new IdentityRoleClaim<int>
                {
                    RoleId = id,
                    ClaimType = "RsCap",
                    ClaimValue = cap
                });
            });

            await db.SaveChangesAsync();

            // if (removeCaps.Any() || newCaps.Any())
            // {
            //     var uids = await db.Users.Where(u => u.Roles.Any(r => r.RoleId == id)).Select(u => u.Id).ToListAsync();

            // }

            // await facebookService.SetUserReactionPage(db);

            return Success();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Role role)
        {
            if (ModelState.IsValid)
            {
                if (string.IsNullOrWhiteSpace(role.Name))
                {
                    return Error("Role name error");
                }

                if (db.Roles.Any(r => r.Name == role.Name))
                {
                    return Error("The role name already exists");
                }

                role.NormalizedName = role.Name.ToUpper();
                db.Roles.Add(role);
                await db.SaveChangesAsync();

                var result = await FormatRole(db.Roles.Where(r => r.Id == role.Id)).FirstOrDefaultAsync();

                return Ok(result);
            }
            return ModelError();
        }
    }
}