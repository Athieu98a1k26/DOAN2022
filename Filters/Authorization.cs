using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rws
{
    public class RsAuthorizeAttribute : AuthorizeAttribute
    {
        public RsAuthorizeAttribute()
        {
            AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme;
            Policy = "RsCheckCap";
        }

        public string Caps { get; set; }
    }
}
