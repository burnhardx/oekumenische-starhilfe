const cache = require("./../../../cache")
const _ = require("underscore");
const path = require("path");
const fs = require("fs");


module.exports = app=>{
    const template = _.template(fs.readFileSync(path.resolve(__dirname, '../../../templates/server/login.html')).toString())
    app.get('/', (req,res)=>{
        res.send(template({}))

    })

}