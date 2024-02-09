const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    let token = req.get('Authorization');
    if (!token) {
        res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decoded) => {
        if (err) {
            res.status(403).send({ auth: false, message: 'Invalid Token' });
        }
        req.body.user = decoded;
        next();
    });
}

module.exports = authenticateToken;