using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;

namespace Rws.Api
{
    [Produces("application/json")]
    [Route("api/enums")]
    public class EnumsController : Controller
    {
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetList()
        {
            Assembly asm = Assembly.GetAssembly(typeof(Rws.Program));
            var result = new Dictionary<string, object>();
            var list = asm.GetTypes()
                    .Where(type => typeof(Enum).IsAssignableFrom(type))
                    .Where(type =>
                            type.GetCustomAttributes<RsEnumAttribute>().Any()
                        )
                    .ToList();

            list.ForEach(item =>
            {
                var mems = item.GetMembers().Where(m => m.MemberType == MemberTypes.Field && m.Name != "value__").ToList();
                var obj = mems.Select(mem => new
                {
                    Name = mem.Name,
                    Value = Enum.Parse(item, mem.Name),
                    Label = mem.GetCustomAttributes<DisplayAttribute>().Select(a => a.Name).FirstOrDefault() ?? mem.Name,
                });

                result.Add(item.Name, obj);
            });

            return Ok(result);

        }
    }
}