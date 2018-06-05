const jwt = require('jsonwebtoken');
const config = require("./../config");

class JwtWrapper {
    constructor() {
        this.expiresIn = !process.env.FUGEE_TOKEN_EXPIRATION ?
            Math.abs(60 * 120 * 1000) :
            Math.abs(process.env.FUGEE_TOKEN_EXPIRATION);
    }

    sign(obj) {
        return jwt.sign(obj,
            config.password,
            {
                expiresIn: this.expiresIn+'ms'
            })
    }

    verify(token){
        try{
            return jwt.verify(token,config.password);
        }catch(err){
            return undefined;
        }
    }
}

module.exports = new JwtWrapper();
