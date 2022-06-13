using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Rws.Hubs;
using Rws.Models;
using Rws.Data;
using System;
using System.Text.RegularExpressions;
using Rws.Services;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Concurrent;
using Microsoft.AspNetCore.Authorization;

namespace Rws.Hubs
{
    // [AllowAnonymous]
    public class MessageHub : Hub
    {
        // public static ConcurrentDictionary<string, string> ConnectionMapping = new ConcurrentDictionary<string, string>();

        // private readonly ApplicationDbContext db;

        // public MessageHub(ApplicationDbContext db)
        // {
        //     this.db = db;
        // }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }

        // public async Task Ping(string message)
        // {
        //     await Clients.Client(Context.ConnectionId).SendAsync("pong", new
        //     {
        //         message = message,
        //         userName = "test"
        //     });
        // }

        public async Task Ping(string message)
        {
            await Clients.All.SendAsync("message", message);
        }

        // public async Task SendConnectionStatusAsync(string deviceId, bool isConnected, string timestamp)
        // {
        //     await Clients.All.SendAsync("message", new
        //     {
        //         type = "CONNECTION_STATUS",
        //         data = new
        //         {
        //             deviceId,
        //             isConnected,
        //             timestamp
        //         }
        //     });
        // }

        // public async Task SendDataDeviceAsync(object data, int id)
        // {
        //     await Clients.All.SendAsync("message", new
        //     {
        //         type = "SEND_DATA_DEVICE_ASYNC",
        //         data,
        //         id
        //     });
        // }

        // protected string GetRemoteIp()
        // {
        //     return Context.GetHttpContext().Connection?.RemoteIpAddress?.ToString();
        // }
    }
}
