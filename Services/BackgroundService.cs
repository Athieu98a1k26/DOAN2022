using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Rws.Data;
using Rws.Models;
using Flurl;
using Flurl.Http;
using Microsoft.AspNetCore.Hosting;

namespace Rws.Services
{
    public class BackgroundService : IHostedService, IDisposable
    {
        public static string AppBaseUrl => "http://localhost:5009";
        static bool Started = false;
        private Timer _timer;
        public BackgroundService()
        {

        }


        public void Run(object state)
        {
            var time = DateTime.UtcNow.AddHours(7).ToString("HHmm");

            // if (time == "0200")
            // {
            Task.Run(async () =>
            {
                // auto run migrate
                var migrate = AppBaseUrl.AppendPathSegment("/background/CheckMigrations");
                var urlmigrate = migrate.ToString();
                try
                {
                    var result = await urlmigrate.GetStringAsync();
                }
                catch
                {
                }

                // Console.WriteLine("hello");
                // end send mail, sms

            });
            // }
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            if (!Started)
            {
                Started = true;
                // Gọi sau khi ứng dụng bắt đầu 30s, tiếp tục gọi sau mỗi 2p
                _timer = new Timer(Run, null, TimeSpan.FromSeconds(30), TimeSpan.FromMinutes(2));
            }
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            Started = false;

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}