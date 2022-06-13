using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Rws.Hubs;

namespace Rws.Services
{
    public class MessageService
    {
        IHubContext<MessageHub> hubcontext;

        public MessageService(IHubContext<MessageHub> hubcontext,
            IHttpContextAccessor httpContext)
        {
            this.hubcontext = hubcontext;
        }

        public async Task SendDataDeviceAsync(object data, int id)
        {
            await hubcontext.Clients.All.SendAsync("message", new
            {
                type = "SEND_DATA_DEVICE_ASYNC",
                data,
                id
            });
        }

    }
}
