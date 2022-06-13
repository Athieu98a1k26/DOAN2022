using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.ComponentModel.DataAnnotations;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Web;
using Newtonsoft.Json;
using Rws.Lib;

namespace Rws
{
    public class LicenseInfo
    {
        public LicenseInfo()
        {
            this.License = License.None;
        }
        public LicenseInfo(bool test)
        {
            if (test)
            {
                this.CreateDate = DateTime.Now;
                this.EndDate = DateTime.Now.AddDays(2);
                this.License = License.Basic;
                this.NumberOfProcess = 5;
                this.NumberOfUser = 15;
                this.IsDemo = true;
            }
            else
            {
                this.License = License.None;
            }
        }

        [Display(Name = "Mã")]
        public Guid Id { get; set; }

        [Display(Name = "Sở hữu")]
        public string Owner { get; set; }

        public string Domains { get; set; }

        [Display(Name = "Ngày tạo")]
        public DateTime CreateDate { get; set; }

        [Display(Name = "Hiệu lực tới")]
        public DateTime? EndDate { get; set; }

        [Display(Name = "Kiểu bản quyền")]
        public License License { get; set; }

        [Display(Name = "Ngành nghề kinh doanh")]
        public Business Business { get; set; }

        [Display(Name = "Số người dùng")]
        public int? NumberOfUser { get; set; }

        [Display(Name = "Số tiến trình")]
        public int? NumberOfProcess { get; set; }

        [Display(Name = "Số khách hàng")]
        public int? NumberOfCustomer { get; set; }

        [Display(Name = "Số đơn hàng trên ngày")]
        public int? NumberOfOrderPerDay { get; set; }

        [Display(Name = "Dung lượng đĩa")]
        public int? StorageQuota { get; set; }

        [Display(Name = "Là bản dùng thử")]
        public bool IsDemo { get; set; }

        [Display(Name = "Lĩnh vực hoạt động")]
        public string Field { get; set; }

        public bool IsValid()
        {
            return this.License != License.None
                && (this.EndDate == null || this.EndDate > DateTime.Now);
        }

        public bool IsEqualTo(License license)
        {
            return this.License == license;
        }

        public bool IsGreaterThan(License license)
        {
            return this.License > license;
        }

        public bool IsLessThan(License license)
        {
            return this.License < license;
        }

    }

    public class LicenseConfig
    {
        public string LicenseKey { get; set; }

        public string ServiceUrl { get; set; }
    }

    [RsEnum]
    public enum License
    {
        None = 0,
        Basic = 10,
        BasicPlus = 12,
        Professional = 20,
        Ultimate = 30,
        Enterprise = 40,
        //Nobita = 50
    }

    [RsEnum]
    public enum Business
    {
        [Display(Name = "Khác")]
        Other = 0,
        [Display(Name = "Ăn uống")]
        FNB = 1,
        [Display(Name = "Sức khỏe")]
        Health = 2,
        [Display(Name = "Làm đẹp")]
        SPA = 3,
        [Display(Name = "Giáo dục")]
        Education = 4,
        [Display(Name = "Bán hàng")]
        Sales = 5
    }
}