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
    [Route("api/giangvien")]
    //[RsAuthorize(Caps = "Department.Manage")]

    public class GiangVienController : BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetList(int page = 1, int pagesize = 20, bool canbo = false, string search = "")
        {
            var query = db.TblGiangViens
            .Include(x => x.DonVi)
            .Include(x => x.TblPhongBan)
            .Include(x => x.ChuyenMon)
            .Include(x => x.NhiemVu)
            .Include(x => x.NghiepVu)
            .AsNoTracking();
            if (!String.IsNullOrEmpty(search))
            {
                query = query.Where(x => x.TenGiangVien.Contains(search));
            }
            if (canbo)
            {
                query = query.Where(x => x.Canbo == StatusIsCanbo.Active);
            }
            else
            {
                query = query.Where(x => x.Canbo == StatusIsCanbo.InActive || !x.Canbo.HasValue);
            }

            var total = await query.CountAsync();

            query = query.OrderByDescending(item => item.Id).Skip((page - 1) * pagesize).Take(pagesize);

            var list = await query.ToListAsync();
            return Ok(new
            {
                list = list,
                total = total
            });
        }

        [HttpGet("getgo")]
        [AllowAnonymous]
        public async Task<IActionResult> GetListGO(int page = 1, int pagesize = 20, bool canbo = false, string search = "")
        {
            var donvi = await db.TblDonVis.ToListAsync();
            var phongban = await db.TblPhongBans.ToListAsync();
            var chuyenmon = await db.TblChuyenMons.ToListAsync();
            var nhiemvu = await db.TblNhiemVus.ToListAsync();
            var nghiepvu = await db.TblNghiepVus.ToListAsync();
            var daotao = await db.TblDaoTaos.ToListAsync();

            return Ok(new
            {
                donvi,
                phongban,
                chuyenmon,
                nhiemvu,
                nghiepvu,
                daotao
            });
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDetail(int id)
        {
            var query = await db.TblGiangViens.Where(x => x.Id == id).FirstOrDefaultAsync();

            return Ok(query);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] TblGiangVien model)
        {
            var found = await db.TblGiangViens.FirstOrDefaultAsync();
            if (found != null)
            {
                model.NgayTao = DateTime.Now;
                // model.ChuyenMonId = await db.TblChuyenMons.Select(x => x.Id).FirstOrDefaultAsync();
                // model.DonViId = await db.TblDonVis.Select(x => x.Id).FirstOrDefaultAsync();
                // model.NghiepVuId = await db.TblNghiepVus.Select(x => x.Id).FirstOrDefaultAsync();
                // model.NhiemVuId = await db.TblNhiemVus.Select(x => x.Id).FirstOrDefaultAsync();
                // model.DaoTaoId = await db.TblDaoTaos.Select(x => x.Id).FirstOrDefaultAsync();
                model.KetQuaThiDua = KetQuaThiDua.CSTDCS;
                model.LoaiGiangVien = LoaiGiangVien.Kiemnhiem;
                model.LoaiVienChuc = LoaiVienChuc.Hoanthanh;
                model.TrinhDo = StatusTrinhDo.Thacsy;
                db.TblGiangViens.Add(model);
                await db.SaveChangesAsync();
            }
            else
            {
                // db.TblDonVis.Add(new TblDonVi
                // {
                //     NgayTao = DateTime.Now,
                //     TenDonVi = "DV1"
                // });
                // db.TblChuyenMons.Add(new TblChuyenMon
                // {
                //     ChuyenNganhTN = "CNTT",
                //     HocHam = "TS",
                //     NoiTN = "TNMT",
                //     NamTN = DateTime.Now
                // });
                // db.TblNghiepVus.Add(new TblNghiepVu
                // {
                //     TenNghiepVU = "CNTT",
                //     GhiChu = "Nghiep vu"
                // });
                // db.TblNhiemVus.Add(new TblNhiemVu
                // {
                //     TenNhiemVu = "Nhiệm vụ"
                // });
                // db.TblDaoTaos.Add(new TblDaoTao
                // {
                //     TenKhoa = "Khoa"
                // });
                await db.SaveChangesAsync();
                model.NgayTao = DateTime.Now;
                // model.ChuyenMonId = await db.TblChuyenMons.Select(x => x.Id).FirstOrDefaultAsync();
                // model.DonViId = await db.TblDonVis.Select(x => x.Id).FirstOrDefaultAsync();
                // model.NghiepVuId = await db.TblNghiepVus.Select(x => x.Id).FirstOrDefaultAsync();
                // model.NhiemVuId = await db.TblNhiemVus.Select(x => x.Id).FirstOrDefaultAsync();
                // model.DaoTaoId = await db.TblDaoTaos.Select(x => x.Id).FirstOrDefaultAsync();
                db.TblGiangViens.Add(model);
                await db.SaveChangesAsync();

            }


            return Ok(await db.TblGiangViens.FirstOrDefaultAsync(x => x.Id == model.Id));
        }

        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Update([FromBody] TblGiangVien model, int id)
        {
            var found = await db.TblGiangViens.Where(u => u.Id == id).FirstOrDefaultAsync();

            if (found != null)
            {
                model.NgayTao = DateTime.Now;
                db.Entry(found).CurrentValues.SetValues(model);
                await db.SaveChangesAsync();

                return Ok(found);
            }

            return Error("Khong ton tai");
        }

        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Delete(int id)
        {
            var found = await db.TblGiangViens.Where(u => u.Id == id).FirstOrDefaultAsync();

            if (found != null)
            {
                db.TblGiangViens.Remove(found);
                await db.SaveChangesAsync();

                return Ok(found);
            }

            return Error("Khong ton tai");
        }

    }
}