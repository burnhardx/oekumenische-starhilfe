const systemUnderTest=require("./../../src/server/fugeeServer");

let server,app,db,wss;
before(done => {
    systemUnderTest().then(system=>{
        server=system.server;
        app=system.app;
        const cache= system.cache;
        db=cache.db;
        wss=system.wss;

        global.server = server;
        global.app = app;
        global.db = db;
        done();
    })
})



after(()=>{
    server.close();
    db.close()
    wss.close()
})