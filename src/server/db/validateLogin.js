
const cache = require("./../cache");
const model = require("./model");
const jwt = require("./../crypto/jwtWrapper")

module.exports = authenticateUser =>{
    model(cache.db).User.findOne({where:{login:authenticateUser.login}}).then(user=>{
        if(user==null){
            res.status(404).send();
        }else{
            if(user.password===hashString(authenticateUser.password)){
                res.send({token:jwt.sign(user.dataValues)})
            }else{
                res.status(404).send();
            }
        }
    })
}