const model = require("./../../db/model");
const cache = require("./../../cache");
const sendError = require("./sendError")

module.exports = (req,res,next)=>{
    const Refugee = model(cache.db).Refugee;
    Refugee.findOne({where:{id:req.params.id}})
        .then(fugee=>{
            req.fugee=fugee;
            next();
        })
        .catch(err=>{
            sendError(res, 'Refugee with id '+req.params.id+' not found',404);
        })
}