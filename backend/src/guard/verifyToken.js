const auth = {}
const jwt = require('jsonwebtoken');

auth.verifyToken = (req, res, next) => {
    try {
        const headers = req.headers;
        if (headers) {
            const token = headers.authorization.split(' ')[1];
            const payload = jwt.verify(token, 'cufifa');
            req.loginId = payload._id;
            next();
        }
    } catch (error) {
        res.status(401).send('Token error');
    }
}

module.exports = auth;