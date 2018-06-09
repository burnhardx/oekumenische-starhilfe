const express = require('express');
const bodyParser = require('body-parser');
const Q = require("q");
const startDB = require("./db/startDB");
const cache = require('./cache')
const port = 8001;

let server;
let db;
const app = express();

app.use(bodyParser.json());
module.exports = () => {
    const defer = Q.defer();

    startDB().then(db => {
        cache.db = db;
        require("./routes/login")(app);
        require("./routes/refugee")(app);

        //require("./routes/html/dashboard/login")(app);
        const wss = require("./ws/websocket")(Math.abs(port+1))

        let server = app.listen(port, () => {
            console.log('Fugee Server started on ' + port);
            server.port = port;
            defer.resolve({
                server: server,
                app: app,
                cache: cache,
                wss:wss
            });
        });
    })
    return defer.promise;
}

