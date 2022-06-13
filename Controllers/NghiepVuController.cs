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
    [Route("api/nghiepvu")]
    //[RsAuthorize(Caps = "Department.Manage")]

    public class NghiepVuController : BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetList(int page = 1, int pagesize = 20, string search = "")
        {
            var query = db.TblNghiepVus.AsNoTracking();
            if (!String.IsNullOrEmpty(search))
            {
                query = query.Where(x => x.TenNghiepVU.Contains(search));
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
            var query = await db.TblNghiepVus.Where(x => x.Id == id).FirstOrDefaultAsync();

            return Ok(query);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] TblNghiepVu model)
        {
            db.TblNghiepVus.Add(model);
            await db.SaveChangesAsync();

            return Ok(await db.TblNghiepVus.FirstOrDefaultAsync(x => x.Id == model.Id));
        }

        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Update([FromBody] TblNghiepVu model, int id)
        {
            var found = await db.TblNghiepVus.Where(u => u.Id == id).FirstOrDefaultAsync();

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
            var found = await db.TblNghiepVus.Where(u => u.Id == id).FirstOrDefaultAsync();

            if (found != null)
            {
                db.TblNghiepVus.Remove(found);
                await db.SaveChangesAsync();

                return Ok(found);
            }

            return Error("Khong ton tai");
        }

    }
}