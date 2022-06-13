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
    [Route("api/sinhvien")]
    //[RsAuthorize(Caps = "Department.Manage")]

    public class SinhVienController : BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetList(int page = 1, int pagesize = 20, string search = "")
        {
            var query = db.SinhViens
            .Include(x => x.DaoTao)
            .Include(x => x.KhoaDaoTao)
            .Include(x => x.DonVi)
            .Include(x => x.ChuyenMon)
            .Include(x => x.NghiepVu)
            .AsNoTracking();

            if (!String.IsNullOrEmpty(search))
            {
                query = query.Where(x => x.TenSinhVien.Contains(search));
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

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDetail(int id)
        {
            var query = await db.SinhViens.Include(x => x.KhoaDaoTao).Where(x => x.Id == id).FirstOrDefaultAsync();

            return Ok(query);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] TblSinhVien model)
        {
            var found = await db.SinhViens.FirstOrDefaultAsync();
            if (found != null)
            {
                model.NgayTao = DateTime.Now;
                model.KetQuaThiDua = KetQuaThiDua.CSTDCS;
                model.TrinhDo = StatusTrinhDo.Thacsy;
                db.SinhViens.Add(model);
                await db.SaveChangesAsync();
            }
            else
            {
                await db.SaveChangesAsync();
                model.NgayTao = DateTime.Now;
                db.SinhViens.Add(model);
                await db.SaveChangesAsync();

            }


            return Ok(await db.SinhViens.FirstOrDefaultAsync(x => x.Id == model.Id));
        }

        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Update([FromBody] TblSinhVien model, int id)
        {
            var found = await db.SinhViens.Where(u => u.Id == id).FirstOrDefaultAsync();

            if (found != null)
            {
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
            var found = await db.SinhViens.Where(u => u.Id == id).FirstOrDefaultAsync();

            if (found != null)
            {
                db.SinhViens.Remove(found);
                await db.SaveChangesAsync();

                return Ok(found);
            }

            return Error("Khong ton tai");
        }

    }
}