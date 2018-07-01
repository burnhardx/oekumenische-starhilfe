const cache = require("./../../cache");
const model = require("./../../db/model");
const Socket = require("./../socketMessage");
const commands = require("./../commands");

module.exports = (query,ws,token)=>{

    const answer = result =>{
        try{
            const answer = new Socket.NewMessage(commands.QueryDB)
                .withPayload({result: !result ? [] : result})
                .create();
            ws.send(JSON.stringify(answer));
        }catch(err){
            console.log(err)
        }
    }

    const DB = model(cache.db)[query.db];
    DB.findAll({where:query.query})
        .then(result=>{
            answer(result);
        })

}