using System;
using System.ComponentModel.DataAnnotations;

namespace Rws.Models
{
    [RsEnum]
    public enum IdentityStatus : byte
    {
        Active = 1,

        Inactive = 2,

        Deleted = 3

        // [Display(Name = "Đã khóa")] Blocked = 4,

        // [Display(Name = "Chưa xác nhận")] UnConfirmed = 5
    }

    [RsEnum]
    public enum Gender : byte
    {
        Unknow = 5,

        Male = 1,

        Female = 2,

        Other = 3
    }

    [RsEnum]
    public enum Status : byte
    {
        Active = 1,
        InActive = 2,

    }

    [RsEnum]
    public enum StatusIsCanbo : byte
    {
        Active = 1,
        InActive = 2,

    }

    [RsEnum]
    public enum StatusTrinhDo : byte
    {
        [Display(Name = "THPT")]
        Thpt = 1,

        [Display(Name = "Đại học")]
        Daihoc = 2,
        [Display(Name = "Thạc sỹ")]
        Thacsy = 3,
        [Display(Name = "Tiến sỹ")]
        Tiensy = 4,

        [Display(Name = "Giáo sư")]
        Giaosu = 5,
        [Display(Name = "Phó giáo sư")]
        Phogiaosu = 6,
    }

    [RsEnum]
    public enum LoaiVienChuc : byte
    {
        [Display(Name = "Hoàn thành xuất sắc nhiệm vụ")]
        Hoanthanhxuatsac = 1,

        [Display(Name = "Hoàn thành tốt nhiệm vụ")]
        Hoanthanhtot = 2,
        [Display(Name = "Hoàn thành nhiệm vụ")]
        Hoanthanh = 3,
        [Display(Name = "Không hoàn thành nhiệm vụ")]
        Khonghoanthanh = 4,
        [Display(Name = "Không xét")]
        KhongXet = 5,
    }

    [RsEnum]
    public enum LoaiGiangVien : byte
    {
        [Display(Name = "Kiêm nhiệm")]
        Kiemnhiem = 1,

        [Display(Name = "Thỉnh giảng")]
        Thinhgiang = 2,
        [Display(Name = "Quốc tế")]
        Quocte = 3,
    }

    [RsEnum]
    public enum KetQuaThiDua : byte
    {
        [Display(Name = "CSTDN")]
        CSTDN = 1,

        [Display(Name = "CSTDCS")]
        CSTDCS = 2,
        [Display(Name = "LDTT")]
        LDTT = 3,
    }

    [RsEnum]
    public enum KhenThuong : byte
    {
        [Display(Name = "BK")]
        BK = 1,

        [Display(Name = "GK")]
        GK = 2,
    }

    [RsEnum]
    public enum KieuGV : byte
    {
        [Display(Name = "Hợp đồng")]
        Hopdong = 1,

        [Display(Name = "Chính thức")]
        Chinhthuc = 2,
    }


    [RsEnum]
    public enum DepartmentStatus : byte
    {
        Active = 1,

        Inactive = 2,
    }

    [RsEnum]
    public enum CategoryStatus : byte
    {
        Active = 1,

        Inactive = 2
    }

    [RsEnum]
    public enum Language : byte
    {
        En = 1,

        Cn = 2
    }


    [RsEnum]
    public enum NotificationType : byte
    {
        /// <summary>
        /// Thông báo hệ thống
        /// </summary>
        System = 1,

        /// <summary>
        /// Thông báo khác
        /// </summary>
        Orther = 2,

        /// <summary>
        /// Chỉ dành cho admin
        /// </summary>
        AdminOnly = 3,

        /// <summary>
        /// Thông báo SMS
        /// </summary>
        Sms = 4,

        /// <summary>
        /// Thông báo email
        /// </summary>
        Email = 5,

    }

    [RsEnum]
    public enum NotificationStatus : byte
    {
        /// <summary>
        /// Mới tạo
        /// </summary>
        New = 0,

        /// <summary>
        /// Đã xem
        /// </summary>
        Viewed = 1,

        /// <summary>
        /// Đã đọc
        /// </summary>
        Clicked = 2,

        /// <summary>
        /// /// Đã đóng
        /// </summary>
        Closed = 3
    }



}
