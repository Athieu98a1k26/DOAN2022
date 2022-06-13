using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Rws.Models
{
    public class ApplicationUser : IdentityUser<int>
    {
        public string Avatar { get; set; }
        [MaxLength(100)]
        public string FullName { get; set; }
        public string Description { get; set; }
        public string CustomerCode { get; set; }
        public DateTime JoinDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? LoginMC { get; set; }
        public DateTime? LoginBO { get; set; }
        public DateTime? DOB { get; set; }
        public bool ExpiredPassport { get; set; }
        public bool IsCustomer { get; set; } = false;
        public bool SMSConsentStatusFlag { get; set; }
        public bool IsCustomerInExclusion { get; set; }
        public string CustomerNRIC { get; set; }
        public IdentityStatus Status { get; set; }
        /*
         * Liên kết đến bảng khác
         */
        public virtual ICollection<UserRole> Roles { get; } = new List<UserRole>();
        public virtual ICollection<IdentityUserClaim<int>> Claims { get; } = new List<IdentityUserClaim<int>>();
        public virtual ICollection<IdentityUserLogin<int>> Logins { get; } = new List<IdentityUserLogin<int>>();
    }

    public class Role : IdentityRole<int>
    {
        [MaxLength(256)]
        public string Description { get; set; }

        public IdentityStatus Status { get; set; }

        public virtual ICollection<UserRole> Users { get; set; }

        public virtual ICollection<IdentityRoleClaim<int>> Claims { get; set; }
    }

    public class UserRole : IdentityUserRole<int>
    {
        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }
    }


}