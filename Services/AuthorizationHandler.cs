using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Routing;
using Rws.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace Rws
{
    public class RsCapAuthorizationRequirement : IAuthorizationRequirement
    {

    }

    public class RsCapAuthorizationHandler : AuthorizationHandler<RsCapAuthorizationRequirement>
    {
        ApplicationDbContext dbContext;
        IHttpContextAccessor httpContextAccessor;
        const string privateKey = "riTYpOTHoUnsicKlICABlARikenEyeAVYINTERENTUDEnRaTENtychaNTiotIcuL";
        public RsCapAuthorizationHandler(ApplicationDbContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            this.dbContext = dbContext;
            this.httpContextAccessor = httpContextAccessor;
        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, RsCapAuthorizationRequirement requirement)
        {
            if (context.Resource == null)
            {
                if (context.User.Identity.IsAuthenticated)
                {
                    context.Succeed(requirement);
                }
            }
            else
            {
                // var headers = httpContextAccessor.HttpContext.Request.Headers;
                // headers.TryGetValue("deviceId", out StringValues deviceId);
                // if (deviceId == "webapp")
                // {
                //     context.Succeed(requirement);
                // }
                // else
                // {
                var routeEndpoint = context.Resource as RouteEndpoint;

                if (routeEndpoint != null && context.User.Identity.IsAuthenticated)
                {
                    if (context.User.IsInRole("Administrators"))
                    {
                        context.Succeed(requirement);
                    }
                    else
                    {
                        var attributes = routeEndpoint.Metadata.GetOrderedMetadata<RsAuthorizeAttribute>();

                        if (attributes.Any())
                        {
                            var caps = attributes.Where(at => at.Caps != null)
                                .SelectMany(at => at.Caps.Split(new[] { ',', '|', ';' }, StringSplitOptions.RemoveEmptyEntries));

                            var isPublicApiAccess = context.User.Claims.Any(cl => cl.Type == "AccessKey");

                            if (isPublicApiAccess)
                            {
                                if (caps.Any())
                                {
                                    var any = context.User.Claims.Any(cl =>
                                       cl.Type == "RsCap" && caps.Contains(cl.Value));

                                    if (!any)
                                    {
                                        return Task.CompletedTask;
                                    }
                                }
                            }
                            else
                            {
                                string capPrefix = "Branch.";
                                caps = caps.Select(c => capPrefix + c).ToList();

                                if (caps.Any())
                                {
                                    var any = dbContext.Users.Any(u =>
                                        u.UserName == context.User.Identity.Name &&
                                        u.Roles.Any(r => r.Role.Claims.Any(
                                            cl => cl.ClaimType == "RsCap" &&
                                            caps.Contains(cl.ClaimValue)
                                        ))
                                        );

                                    if (!any)
                                    {
                                        return Task.CompletedTask;
                                    }
                                }
                            }
                            context.Succeed(requirement);
                        }
                    }
                }
                // }

            }
            return Task.CompletedTask;
        }
    }
}
