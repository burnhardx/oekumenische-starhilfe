const systemUnderTest=require("./../../src/server/fugeeServer");

let server,app,db;
before(done => {
    systemUnderTest().then(system=>{
        server=system.server;
        app=system.app;
        const cache= system.cache;
        db=cache.db;
        global.app = app;
        global.db = db;
        done();
    })
})



after(()=>{
    server.close();
    db.close()
})