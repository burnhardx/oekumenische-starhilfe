const cache = require("./../../cache");
const model = require("./../../db/model");
const jwt = require("./../../crypto/jwtWrapper")
const hashString = require("./../../crypto/hashString")
const Socket = require("./../socketMessage");
const commands = require("./../commands")

module.exports = (authenticateUser, ws) => {

    const answerWithToken = user=>{
        const answer = new Socket.NewMessage(commands.AuthenticateUser)
            .withPayload({token: jwt.sign(user.dataValues)})
            .create();
        return answer
    }

    if(process.env.SOCKET_TESTING=="true"){
        ws.send(JSON.stringify(answerWithToken({dataValues:{name:'Heribert'}})))
    }else{
        model(cache.db).User.findOne({where: {login: authenticateUser.login}}).then(user => {
            if (user != null) {
                if (user.password === hashString(authenticateUser.password)) {
                    const answer = answerWithToken(user);
                    ws.send(JSON.stringify(answer));
                }
            }
        })
    }
}