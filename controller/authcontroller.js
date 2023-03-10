const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/utils');


const checkAuthentication = (req, res, next) => {
    console.log(req.token);
    const receivedToken = req.token || req.body.token || req.query.token || req.headers["x-access-token"];
    if (!receivedToken) {
        return res.status(403).send("No token is received!");
    }
    else {
        try {
            const getUserFromToken = jwt.verify(receivedToken, TOKEN_SECRET);
            req.user = getUserFromToken;
        } catch (error) {
            return res.status(401).send("Invalid Token");
        }
        return next();
    }
}

module.exports = checkAuthentication;