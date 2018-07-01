/**
 * Singleton WebSocket Client.
 */

class WebSocketClient {
    constructor(url) {
        this.url=url;
        this.online=false;
        this.reconnect=true;
        this.connect();
    }

    connect(){
        if (typeof WebSocket == 'undefined') {
            global.WebSocket = require("ws");
        }
        this.ws = new WebSocket('ws://'+this.url);
        const instance = this;
        const errorHandling = evt=>{
            instance.online=false;
            if(instance.reconnect){
                setTimeout(()=>{
                    instance.connect();
                },400)
            }
        }
        this.ws.addEventListener("error", evt=>{instance.online=false});
        this.ws.addEventListener("close", errorHandling);
        this.ws.addEventListener("open", evt=>{instance.online=true});
    }

    close(){
        this.reconnect=false;
    }

    isOnline() {
        return this.online;
    }
}

module.exports = WebSocketClient;