/*
 * Handles all routes for login.
 */

const model = require("./../db/model");
const hashString = require("./../crypto/hashString");
const jwt = require("./../crypto/jwtWrapper");
const cache = require("./../cache");

module.exports = app => {
    app.post('/login', (req, res) => {
        if(!req.body.login || !req.body.password){
            res.status(404).send();
            return;
        }

        model(cache.db).User.findOne({where:{login:req.body.login}}).then(user=>{
            if(user==null){
                res.status(404).send();
            }else{
                if(user.password===hashString(req.body.password)){
                    res.send({token:jwt.sign(user.dataValues)})
                }else{
                    res.status(404).send();
                }
            }
        })
    })
}