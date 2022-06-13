using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Rws.Models
{
    public class TblDonVi
    {
        [Key]
        public int Id { get; set; }
        public string TenDonVi { get; set; }
        public DateTime NgayTao { get; set; }
        public virtual ICollection<TblGiangVien> TblGiangViens { get; set; }
    }

    public class TblGiangVien
    {
        [Key]
        public int Id { get; set; }
        public string TenGiangVien { get; set; }
        public string GioiTinh { get; set; }
        public bool BienChe { get; set; }
        public string ChucVu { get; set; }
        public StatusTrinhDo? TrinhDo { get; set; }
        public StatusIsCanbo? Canbo { get; set; }
        public bool NuocNgoai { get; set; } = false;
        public int SoDeTai { get; set; }
        public int KhoaDaoTao { get; set; }
        public DateTime NamHoc { get; set; }
        public DateTime NgaySinh { get; set; }
        public DateTime NgayTao { get; set; }
        public string GhiChu { get; set; }
        public KieuGV? KieuGV { get; set; }
        public KhenThuong? KhenThuong { get; set; }
        public KetQuaThiDua? KetQuaThiDua { get; set; }
        public LoaiGiangVien? LoaiGiangVien { get; set; }
        public LoaiVienChuc? LoaiVienChuc { get; set; }
        public int? DaoTaoId { get; set; }
        [ForeignKey("DaoTaoId")]
        public virtual TblDaoTao DaoTao { get; set; }
        public int DonViId { get; set; }
        [ForeignKey("DonViId")]
        public virtual TblDonVi DonVi { get; set; }
        public int ChuyenMonId { get; set; }
        [ForeignKey("ChuyenMonId")]
        public virtual TblChuyenMon ChuyenMon { get; set; }

        public int NghiepVuId { get; set; }
        [ForeignKey("NghiepVuId")]
        public virtual TblNghiepVu NghiepVu { get; set; }
        public int NhiemVuId { get; set; }
        [ForeignKey("NhiemVuId")]
        public virtual TblNhiemVu NhiemVu { get; set; }

        public int? TblPhongBanId { get; set; }
        [ForeignKey("TblPhongBanId")]
        public virtual TblPhongBan TblPhongBan { get; set; }
        public virtual ICollection<TblGiangVienPhongBan> PhongBan { get; set; }

    }

    public class TblChuyenMon
    {
        [Key]
        public int Id { get; set; }
        public string HocHam { get; set; }
        public string ChuyenNganhTN { get; set; }
        public DateTime NamTN { get; set; }
        public string NoiTN { get; set; }
    }

    public class TblDaoTao
    {
        [Key]
        public int Id { get; set; }
        public string TenKhoa { get; set; }  //khóa đào tạo
    }

    public class TblPhongBan
    {
        [Key]
        public int Id { get; set; }
        public string TenPhongBan { get; set; }
        public string GhiChu { get; set; }
        public DateTime? NgayTao { get; set; }
        public virtual ICollection<TblGiangVienPhongBan> GiangViens { get; set; }
    }

    public class TblGiangVienPhongBan
    {
        public int GiangVienId { get; set; }

        public int PhongBanId { get; set; }

        [ForeignKey("GiangVienId")]
        public virtual TblGiangVien GiangVien { get; set; }

        [ForeignKey("PhongBanId")]
        public virtual TblPhongBan PhongBan { get; set; }

    }

    public class TblNghiepVu
    {
        [Key]
        public int Id { get; set; }
        public string TenNghiepVU { get; set; }
        public string GhiChu { get; set; }
    }


    public class TblNhiemVu
    {
        [Key]
        public int Id { get; set; }
        public string TenNhiemVu { get; set; }

    }

}