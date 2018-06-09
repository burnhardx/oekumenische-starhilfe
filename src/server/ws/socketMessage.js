const commands = require("./commands");

class Socket {
    constructor(build) {
        this.command= build.command;
        this.token=build.command;
        this.payload= build.payload;
    }

    is(command){
        return this.command==command;
    }

    isSecure(){
        return !this.token ? this.command===commands.AuthenticateUser : this.token!='';
    }

    payloadAsObject() {
        return !this.payload ? {} : JSON.parse(this.payload);
    }

    static get NewMessage() {
        class NewMessage {
            constructor(command,token) {
                this.command=command;
                this.token =token;
            }
            withPayload(obj){
                this.payload=JSON.stringify(obj);
                return this;
            }
            create() {
                return new Socket(this);
            }
        }
        return NewMessage;
    }
}

module.exports = Socket;