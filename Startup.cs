using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters.Xml;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Rws.Data;
using Rws.Models;
using Rws.Services;
// using System.Data.SqlClient;

namespace Rws
{
    public class Startup
    {
        private IConfiguration configuration;
        private IWebHostEnvironment env;
        public static string SecurityKey = "Chúng ta cứ enjoy cái moment này đi cun foolish..";

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            this.configuration = configuration;
            this.env = env;

            // NpgsqlConnection.GlobalTypeMapper.UseJsonNet();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // services.AddSignalR(hub =>
            // {
            //     hub.ClientTimeoutInterval = TimeSpan.FromMinutes(30);
            // });

            services.AddDbContext<ApplicationDbContext>(options =>
               options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"), sqlOption => sqlOption.CommandTimeout(60)));
            services.AddIdentity<ApplicationUser, Role>(options =>
            {
                // Password settings
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                // User settings
                options.User.RequireUniqueEmail = true;
                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;
            })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders()
                .AddUserStore<UserStore<ApplicationUser, Role, ApplicationDbContext, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityUserToken<int>, IdentityRoleClaim<int>>>()
                .AddRoleStore<RoleStore<Role, ApplicationDbContext, int, UserRole, IdentityRoleClaim<int>>>();

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecurityKey));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.SaveToken = true;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = signingKey,
                        ValidateIssuer = true,
                        ValidIssuer = "RS",
                        ValidateAudience = true,
                        ValidAudience = "RS",
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            if (context.Request.Query.TryGetValue("access_token", out StringValues token))
                            {
                                context.Token = token;
                            }

                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddCors(options =>
            {
                options.AddPolicy("MyAllowSubdomainPolicy",
                    builder =>
                    {
                        builder.WithOrigins("http://*, https://*")
                            .SetIsOriginAllowedToAllowWildcardSubdomains()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            services.AddControllersWithViews().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("RsCheckCap", policy =>
                   policy.Requirements.Add(new RsCapAuthorizationRequirement()));
            });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "wwwroot";
            });

            // configuration
            services.Configure<AppSettings>(configuration);

            // background services.
            services.AddHostedService<Services.BackgroundService>();
            //singleton services
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // scoped services
            // services.AddScoped<OptionService>();
            // services.AddScoped<UploadService>();
            // services.AddScoped<EmailSender>();
            //permission handle
            services.AddScoped<IAuthorizationHandler, RsCapAuthorizationHandler>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            // app.UseSession();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                var debug = configuration.GetValue<bool>("Debug", false);
                if (debug)
                {
                    app.UseDeveloperExceptionPage();
                    app.UseDatabaseErrorPage();
                }
                else
                {
                    app.UseExceptionHandler("/Home/Error");
                }
            }

            app.UseSpaStaticFiles();
            app.UseStaticFiles();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseCors("MyAllowSubdomainPolicy");

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                // endpoints.MapHub<MessageHub>("/messagehub");
                endpoints.MapControllerRoute("token", "token", defaults: new { controller = "token", action = "generate" });
                endpoints.MapControllerRoute("default", "{controller}/{action=index}/{id?}");
            });

            app.UseSpa(config =>
            {
                config.Options.StartupTimeout = TimeSpan.FromMinutes(1);
                config.Options.SourcePath = "/";

                if (env.IsDevelopment())
                {
                    config.UseProxyToSpaDevelopmentServer("http://localhost:5008");
                }
            });
        }
    }
}