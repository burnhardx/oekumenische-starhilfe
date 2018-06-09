const systemUnderTest=require("./../../../src/server/fugeeServer");

const should = require('chai').should();

const WebSocket = require('ws');
const Authenticate = require("./../../../src/server/ws/messages/authenticate")
const Query = require("./../../../src/server/ws/messages/query")
const SocketMessage = require("./../../../src/server/ws/socketMessage")
const commands = require("./../../../src/server/ws/commands")

require("./../startFugeeTestSystem");

process.env.SOCKET_TESTING=true;

describe("Websocket Communication", ()=>{

    const testUser = {
        name: 'beppo',
        login: 'Beppo' + new Date().getTime(),
        password: 'beppo'
    }

    it("is possible and testible", done=>{
        const ws = new WebSocket('ws://localhost:8002');

        ws.on('message', data=> {
            const answer = new SocketMessage(JSON.parse(data));
            if(answer.is(commands.AuthenticateUser)){
                const token = answer.payloadAsObject().token;
                should.exist(token);
                const query=new SocketMessage
                    .NewMessage(commands.QueryDB, token)
                    .withPayload(
                        new Query.Refugees()
                            .with({nation:'afghan'})
                    )
                    .create()
                ws.send(JSON.stringify(query))
            }
            if(answer.is(commands.QueryDB)){
                answer.payloadAsObject().result.length.should.not.equal(0);
                console.log(answer.payloadAsObject().result.length);
                done();
            }
        });
        ws.on('open', function open() {

            const message= new SocketMessage
                .NewMessage(commands.AuthenticateUser)
                .withPayload(
                    new Authenticate.User()
                        .withLogin(testUser.login)
                        .withPassword(testUser.password)
                        .create())
                .create();

            ws.send(JSON.stringify(message));
        });
    })

})
