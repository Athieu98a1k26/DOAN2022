using System;
using System.Linq;
using System.Security.Claims;

namespace Rws
{
    public static class ClaimsPrincipalExtensions
    {
        public static int GetUserId(this ClaimsPrincipal user)
        {
            var id = user.Claims
                .Where(c => c.Type == "Ecrm.User.Id")
                .Select(c => c.Value).FirstOrDefault();

            return Convert.ToInt32(id);
        }
    }
}