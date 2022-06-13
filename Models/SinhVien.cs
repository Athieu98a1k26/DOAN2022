using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Rws.Models
{
    public class TblSinhVien
    {
        [Key]
        public int Id { get; set; }
        public string TenSinhVien { get; set; }
        public string GioiTinh { get; set; }
        public bool BienChe { get; set; }
        public string ChucVu { get; set; }
        public StatusTrinhDo? TrinhDo { get; set; }
        public bool NuocNgoai { get; set; } = false;
        public DateTime NamHoc { get; set; }
        public DateTime NgaySinh { get; set; }
        public DateTime NgayTao { get; set; }
        public string GhiChu { get; set; }
        public KhenThuong? KhenThuong { get; set; }
        public KetQuaThiDua? KetQuaThiDua { get; set; }
        public int? DaoTaoId { get; set; }
        [ForeignKey("DaoTaoId")]
        public virtual TblDaoTao DaoTao { get; set; }
        public int? DonViId { get; set; }
        [ForeignKey("DonViId")]
        public virtual TblDonVi DonVi { get; set; }
        public int? ChuyenMonId { get; set; }
        [ForeignKey("ChuyenMonId")]
        public virtual TblChuyenMon ChuyenMon { get; set; }

        public int? NghiepVuId { get; set; }
        [ForeignKey("NghiepVuId")]
        public virtual TblNghiepVu NghiepVu { get; set; }
        public int? KhoaDaoTaoId { get; set; }
        [ForeignKey("KhoaDaoTaoId")]
        public virtual TblKhoaDaoTao KhoaDaoTao { get; set; }
    }

    public class TblKhoaDaoTao
    {
        [Key]
        public int Id { get; set; }
        public string TenKhoa { get; set; }  //tên khoa đào tạo
        public DateTime NgayTao { get; set; }
        public virtual ICollection<TblSinhVien> SinhVien { get; set; }
    }

}