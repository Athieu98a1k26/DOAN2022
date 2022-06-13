
import * as signalR from '@microsoft/signalr';

const messagehub = new signalR.HubConnectionBuilder()
    .withUrl("/messagehub"
        // , {
        //     accessTokenFactory: () => {

        //         let headers = { app: 'realtime', deviceId: 'webapp' };

        //         return JSON.stringify(headers);
        //     },
        //     headers: { app: 'realtime', deviceId: 'webapp' }
        // }
    )
    .withAutomaticReconnect([0, 100, 200, 500, 800, 1000, 2000, 3000, null])
    .configureLogging(signalR.LogLevel.Information)
    .build();

export function connect() {
    messagehub.start()
        .then((d) => {
            console.log(d, 'connected..')
        })
        .catch(e => {
            console.log(e, 'connect error, reconnecting..')
            setTimeout(connect, 3000);
        })
}

messagehub.onclose(() => {
    console.log('message hub closed, reconnecting...')
    setTimeout(connect, 3000);
})

export function disconnect() {
    messagehub.stop();
}

messagehub.on('message', data => {
    console.log('hub message', data)
})

class SyncEvent {
    constructor(type) {
        this.type = type;
        this.funcs = [];
    }

    handleMessage = data => {
        // console.log(data, "dtatattâttât")
        if (data.type == this.type) {
            this.funcs.forEach(f => f(data));
            // this.funcs.forEach(f => f(data.data));
        }

    }

    addEventListener = func => {
        if (func) {
            if (this.funcs.length == 0) {
                messagehub.on('message', this.handleMessage);
            }
            this.funcs = [...this.funcs, func];
        }
    }

    removeEventListener = func => {
        if (func) {
            this.funcs = this.funcs.filter(f => f != func);
            if (this.funcs.length == 0) {
                messagehub.off('message', this.handleMessage);
            }
        }
    }
}

messagehub.on('connected', data => {
    window.signalRConnectionId = data.connectionId;
    console.log('singleR: connected', data)
})

messagehub.on('pong', data => {
    console.log('singleR: pong', data)
})

// messagehub.onreconnected(data => {
//     messagehub.invoke("Join");
// })

window.ping = (message) => {
    console.log("ping-----")
    messagehub.invoke("Ping", message)
}

connect();
// ping();

export default messagehub;

export const statusEvent = new SyncEvent('CONNECTION_STATUS');
export const statusEventDevice = new SyncEvent('SEND_DATA_DEVICE_ASYNC');