const jwt = require("./../../crypto/jwtWrapper")
const sendErrorMessage = require("./sendError")

module.exports = (req, res,next) => {
    if (!req.params.token) {
        sendErrorMessage(res, 'Not Accessible Token');
        return;
    }

    const user = jwt.verify(req.params.token);
    if (!user) {
        sendErrorMessage(res, 'Unknown Token');
        return;
    }
    req.user = user;
    next();
}