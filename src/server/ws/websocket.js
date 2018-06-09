const fs = require("fs");
const path = require("path");

const WebSocket = require('ws');

const commands = require("./commands")
const SocketMessage = require("./socketMessage")

module.exports = port => {

    const wss = new WebSocket.Server({port: port});

    const readDirectory = dir => {
        return fs.readdirSync(dir)
            .filter(file => file.indexOf('.js'))
            .map(file => file.replace('.js', ''));
    }

    const messages = readDirectory(path.resolve(__dirname, 'messages'));
    const commands = readDirectory(path.resolve(__dirname, 'commands'));

    const isValidMessage=(socketMessage)=>{
        const command = socketMessage.command;
        return commands.indexOf(command) != -1 &&
            messages.indexOf(command) != -1 &&
            socketMessage.isSecure();
    }

    wss.on('connection', ws => {

        ws.on('message', msg => {
            try {

                const socketMessage = new SocketMessage(JSON.parse(msg));
                if (isValidMessage(socketMessage)) {
                    const command = socketMessage.command;
                    const ModelForCommand = new require("./messages/" + command);
                    const model = new ModelForCommand(socketMessage.payloadAsObject());
                    const commandAction = require("./commands/" + command);
                    commandAction(model, ws, !socketMessage.token ? undefined : socketMessage.token);
                }

            } catch (err) {

            }

        });
    });

    return wss;
}