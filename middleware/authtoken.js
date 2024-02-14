const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    let token = req.get('Authorization');
    if (!token) {
        return res.status(401).send('No token provided.');
    }
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid Token');
        }
        req.body.user = decoded;
        next();
    });
}

module.exports = authenticateToken;