const should = require("chai").should();

const WebSocketClient = require("./../../../src/mobile-volunteer/ws/client")
const systemUnderTest=require("./../../../src/server/fugeeServer");

describe("client",()=>{

    const underTest = new WebSocketClient('localhost:8002');

    xit("detects if the websocket server is available", done=>{
        underTest.isOnline().should.equal(false);

        systemUnderTest().then(system=>{
            let server=system.server;
            let app=system.app;
            const cache= system.cache;
            db=cache.db;
            let wss = system.wss;

            setTimeout(()=>{
                server.close();
                db.close();
                underTest.isOnline().should.equal(true);
                wss.close();
                underTest.close();
                done();
            },800)

        })

    })



})