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
using Newtonsoft.Json;
using Rws.Data;
using Rws.Models;

namespace Rws.Api
{
    [Produces("application/json")]
    [Route("api/report")]
    //[RsAuthorize(Caps = "Department.Manage")]

    public class ReportController : BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetList(int page = 1, int pagesize = 200)
        {
            var query = db.TblGiangViens.AsNoTracking();

            var total = await query.CountAsync();

            query = query.OrderByDescending(item => item.Id).Skip((page - 1) * pagesize).Take(pagesize);

            var list = await query.Select(x => new
            {
                x.TenGiangVien,
                x.NgaySinh,
                x.ChuyenMon,
                x.NghiepVu,
                x.ChucVu,
                x.DonVi,
                x.NhiemVu,
                x.GhiChu
            }).ToListAsync();
            return Ok(new
            {
                list = list,
                total = total
            });
        }


        [HttpGet("dtbd")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDtbd(int page = 1, int pagesize = 200)
        {
            var query = db.TblGiangViens.AsNoTracking();

            var total = await query.CountAsync();

            query = query.OrderByDescending(item => item.Id).Skip((page - 1) * pagesize).Take(pagesize);

            var list = await query.Select(x => new
            {
                x.TenGiangVien,
                x.NgaySinh,
                x.ChuyenMon,
                x.NghiepVu,
                x.ChucVu,
                x.DonVi.TenDonVi,
                TenKhoa = x.DaoTao.TenKhoa,
                Ketqua = x.DaoTaoId.HasValue ? "Đào tạo" : "Bồi dưỡng",
                x.NhiemVu,
                x.GhiChu
            }).ToListAsync();
            return Ok(new
            {
                list = list,
                total = total
            });
        }


        [HttpGet("trinhdo")]
        [AllowAnonymous]
        public async Task<IActionResult> GetListTrinhDo(int page = 1, int pagesize = 200)
        {
            var query = db.TblGiangViens.AsNoTracking();

            var total = await query.CountAsync();

            query = query.OrderByDescending(item => item.Id).Skip((page - 1) * pagesize).Take(pagesize);

            var list = await query.Select(x => new
            {
                x.TenGiangVien,
                x.NgaySinh,
                x.ChuyenMon,
                x.NghiepVu,
                x.ChucVu,
                x.DonVi,
                x.NhiemVu,
                x.GhiChu,
                x.TrinhDo,
                NamHoc = x.NamHoc.Year
            }).ToListAsync();
            var groupYear = list.GroupBy(x => x.NamHoc).Select(x => new
            {
                namhoc = x.Key,
                thpt = x.Where(xx => xx.TrinhDo == StatusTrinhDo.Thpt).Count(),
                tongcong = x.Where(xx => xx.TrinhDo.HasValue).Count(),
                daihoc = x.Where(xx => xx.TrinhDo == StatusTrinhDo.Daihoc).Count(),
                giaosu = x.Where(xx => xx.TrinhDo == StatusTrinhDo.Giaosu).Count(),
                phogiaosu = x.Where(xx => xx.TrinhDo == StatusTrinhDo.Phogiaosu).Count(),
                thacsy = x.Where(xx => xx.TrinhDo == StatusTrinhDo.Thacsy).Count(),
                tiensy = x.Where(xx => xx.TrinhDo == StatusTrinhDo.Tiensy).Count()
            });
            return Ok(new
            {
                list = groupYear,
                total = total
            });
        }

        [HttpGet("trinhdonangcao")]
        [AllowAnonymous]
        public async Task<IActionResult> GetListTrinhDoNangCao(int page = 1, int pagesize = 200)
        {
            var query = db.TblGiangViens.AsNoTracking();

            var total = await query.CountAsync();

            query = query.OrderByDescending(item => item.Id).Skip((page - 1) * pagesize).Take(pagesize);

            var list = await query.Select(x => new
            {
                x.TenGiangVien,
                x.NgaySinh,
                x.ChuyenMon,
                x.NghiepVu,
                x.ChucVu,
                x.DonVi,
                x.NhiemVu,
                x.GhiChu,
                x.TrinhDo,
                x.DaoTao,
                NamHoc = x.NamHoc.Year
            }).ToListAsync();
            var groupYear = list.GroupBy(x => x.NamHoc).Select(x => new
            {
                namhoc = x.Key,
                thacsy = x.Where(xx => xx.DaoTao != null && xx.TrinhDo == StatusTrinhDo.Thacsy).Count(),
                tiensy = x.Where(xx => xx.DaoTao != null && xx.TrinhDo == StatusTrinhDo.Tiensy).Count(),
                thacsy1 = x.Where(xx => xx.ChuyenMon != null && xx.TrinhDo == StatusTrinhDo.Thacsy).Count(),
                tiensy1 = x.Where(xx => xx.ChuyenMon != null && xx.TrinhDo == StatusTrinhDo.Tiensy).Count()
            });
            return Ok(new
            {
                list = groupYear,
                total = total
            });
        }

        [HttpGet("danhgia")]
        [AllowAnonymous]
        public async Task<IActionResult> GetListDanhGia(int page = 1, int pagesize = 200)
        {
            var query = db.TblGiangViens.AsNoTracking();

            var total = await query.CountAsync();

            query = query.OrderByDescending(item => item.Id).Skip((page - 1) * pagesize).Take(pagesize);

            var list = await query.Select(x => new
            {
                x.TenGiangVien,
                x.NgaySinh,
                x.ChuyenMon,
                x.NghiepVu,
                x.ChucVu,
                x.DonVi,
                x.NhiemVu,
                x.GhiChu,
                x.TrinhDo,
                x.DaoTao,
                x.LoaiVienChuc,
                x.KetQuaThiDua,
                x.KhenThuong,
                NamHoc = x.NamHoc.Year
            }).ToListAsync();
            var groupYear = list.GroupBy(x => x.NamHoc).Select(x => new
            {
                namhoc = x.Key,
                xuatsac = x.Where(xx => xx.LoaiVienChuc == LoaiVienChuc.Hoanthanhxuatsac).Count(),
                tot = x.Where(xx => xx.LoaiVienChuc == LoaiVienChuc.Hoanthanhtot).Count(),
                hoanthanh = x.Where(xx => xx.LoaiVienChuc == LoaiVienChuc.Hoanthanh).Count(),
                khoanthanh = x.Where(xx => xx.LoaiVienChuc == LoaiVienChuc.Khonghoanthanh).Count(),
                khongxet = x.Where(xx => xx.LoaiVienChuc == LoaiVienChuc.KhongXet).Count(),
                cstdn = x.Where(xx => xx.KetQuaThiDua == KetQuaThiDua.CSTDN).Count(),
                cstdncs = x.Where(xx => xx.KetQuaThiDua == KetQuaThiDua.CSTDCS).Count(),
                ldtt = x.Where(xx => xx.KetQuaThiDua == KetQuaThiDua.LDTT).Count(),
                bk = x.Where(xx => xx.KhenThuong == KhenThuong.BK).Count(),
                gk = x.Where(xx => xx.KhenThuong == KhenThuong.GK).Count(),
            });
            return Ok(new
            {
                list = groupYear,
                total = total
            });
        }


    }
}