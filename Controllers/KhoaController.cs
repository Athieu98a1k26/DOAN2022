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
    [Route("api/khoadaotao")]
    //[RsAuthorize(Caps = "Department.Manage")]

    public class KhoaController : BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetList(int page = 1, int pagesize = 20, string search = "")
        {
            var query = db.KhoaDaoTaos.AsNoTracking();
            if (!String.IsNullOrEmpty(search))
            {
                query = query.Where(x => x.TenKhoa.Contains(search));
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
            var query = await db.KhoaDaoTaos.Where(x => x.Id == id).FirstOrDefaultAsync();

            return Ok(query);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] TblKhoaDaoTao model)
        {
            db.KhoaDaoTaos.Add(model);
            await db.SaveChangesAsync();

            return Ok(await db.KhoaDaoTaos.FirstOrDefaultAsync(x => x.Id == model.Id));
        }

        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Update([FromBody] TblKhoaDaoTao model, int id)
        {
            var found = await db.KhoaDaoTaos.Where(u => u.Id == id).FirstOrDefaultAsync();

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
            var found = await db.KhoaDaoTaos.Where(u => u.Id == id).FirstOrDefaultAsync();

            if (found != null)
            {
                db.KhoaDaoTaos.Remove(found);
                await db.SaveChangesAsync();

                return Ok(found);
            }

            return Error("Khong ton tai");
        }

    }
}