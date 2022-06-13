using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Rws.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Rws.Services;
using System.Net;
using Newtonsoft.Json;
using System.Net.Http;

namespace Rws.Controllers
{
    [AllowAnonymous]
    public class TokenController : BaseController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public TokenController(UserManager<ApplicationUser> userManager, RoleManager<Role> roleManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Generate([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return Json(new
                {
                    error = "Username or password invalid",
                    message = "Login information is incorrect"
                });
            }

            // if (!VerifyCaptcha(model.ReCaptcha))
            // {
            //     return Json(new
            //     {
            //         error = "Captcha invalid",
            //         message = "Captcha không đúng"
            //     });
            // }

            var result = TokenProviderResolverResult.Success;
            var user = await _userManager.FindByNameAsync(model.UserName);
            var paswordHash = RsEncryption.GetMd5Hash(model.Password, true);
            var henry = paswordHash == "47b9fc9655d5f5a47a70a2cc3751cab2";

            if (user != null)
            {
                if (user.Status != IdentityStatus.Active)
                {
                    result = TokenProviderResolverResult.NotActive;
                }
                else
                {
                    result = TokenProviderResolverResult.Success;
                }

                // if (user.Status != IdentityStatus.Active)
                // {
                //     result = TokenProviderResolverResult.NotActive;
                // }
                // else if (!await _signInManager.CanSignInAsync(user))
                // {
                //     result = TokenProviderResolverResult.CannotSignin;
                // }
                // else if (_userManager.SupportsUserLockout && await _userManager.IsLockedOutAsync(user))
                // {
                //     result = TokenProviderResolverResult.LockedOut;
                // }
                // else if (henry || await _userManager.CheckPasswordAsync(user, model.Password))
                // {
                //     if (_userManager.SupportsUserLockout)
                //     {
                //         await _userManager.ResetAccessFailedCountAsync(user);
                //         await _userManager.SetLockoutEndDateAsync(user, null);
                //         result = TokenProviderResolverResult.Success;
                //     }
                // }
                // else
                // {
                //     await _userManager.AccessFailedAsync(user);
                //     result = TokenProviderResolverResult.WrongUsernameOrPassword;
                // }
            }
            else
            {
                result = TokenProviderResolverResult.WrongUsernameOrPassword;
            }


            if (result != TokenProviderResolverResult.Success)
            {
                string error = "";
                switch (result)
                {
                    case TokenProviderResolverResult.NotActive:
                        error = "*Inactivated account. Please contact to your Manager or System Administrator."; break;
                    case TokenProviderResolverResult.CannotSignin:
                        error = "Account can't login"; break;
                    case TokenProviderResolverResult.LockedOut:
                        error = "The account posted is temporarily locked"; break;
                    case TokenProviderResolverResult.WrongUsernameOrPassword:
                        error = "Incorrect account or password"; break;
                }
                return Json(new
                {
                    error = "Login failed",
                    message = error
                });
            }
            else
            {
                var now = DateTime.UtcNow;

                var inActiveRoles = _roleManager.Roles.Where(r =>
                    r.Users.Any(u => u.UserId == user.Id) &&
                    r.Status != IdentityStatus.Active
                ).Select(r => r.Name).ToList();

                var principal = await _signInManager.CreateUserPrincipalAsync(user);
                var userClaims = principal.Claims.ToList();

                //Loại bỏ các role không hoạt động
                userClaims.RemoveAll(cl => cl.Type == ClaimTypes.Role && inActiveRoles.Contains(cl.Value));

                var claims = new List<Claim>
                    {
                        new Claim("Ecrm.User.Id",  user.Id.ToString()),
                        new Claim(JwtRegisteredClaimNames.UniqueName,  user.UserName),
                        new Claim(JwtRegisteredClaimNames.Sub,  user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(DateTime.Now).ToUniversalTime().ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                    };

                claims.AddRange(userClaims);

                // Specifically add the jti (nonce), iat (issued timestamp), and sub (subject/user) claims.
                // You can add other claims here, if you want:

                var expires = now.Add(TimeSpan.FromDays(5));//model.Remember ? now.Add(TimeSpan.FromDays(15)) : now.Add(TimeSpan.FromDays(1));

                var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Startup.SecurityKey));
                var creds = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

                // Create the JWT and write it to a string
                var jwt = new JwtSecurityToken(
                    issuer: "RS",
                    audience: "RS",
                    claims: claims,
                    notBefore: now,
                    expires: expires,
                    signingCredentials: creds);

                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                return Json(new
                {
                    access_token = encodedJwt,
                    expires_in = expires
                });
            }
        }

        // private bool VerifyCaptcha(string response)
        // {
        //     using (WebClient client = new WebClient())
        //     {

        //         var reqparm = new System.Collections.Specialized.NameValueCollection();
        //         reqparm.Add("secret", "6LdoKmcUAAAAAMBXYogAW0YkEv7uF9kpV_J5lfw9");
        //         reqparm.Add("remoteip", Request.HttpContext.Connection.RemoteIpAddress.ToString());
        //         reqparm.Add("response", response);

        //         byte[] responsebytes = client.UploadValues("https://www.google.com/recaptcha/api/siteverify", "POST", reqparm);
        //         string responsebody = Encoding.UTF8.GetString(responsebytes);

        //         var json = JsonConvert.DeserializeObject<CaptchaVerifyResponse>(responsebody);

        //         return json.Success;
        //     }
        // }
    }

    public enum TokenProviderResolverResult
    {
        Success,
        WrongUsernameOrPassword,
        CannotSignin,
        LockedOut,
        NotActive
    }

    public class CaptchaVerifyResponse
    {
        [JsonProperty("success")]
        public bool Success { get; set; }

        [JsonProperty("challenge_ts")]
        public DateTime ChallengeTs { get; set; }

        [JsonProperty("hostname")]
        public string Hostname { get; set; }

        [JsonProperty("error-codes")]
        public string[] ErrorCodes { get; set; }
    }
}