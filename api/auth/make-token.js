const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./secret.js');

module.exports = {
    makeToken(userObj) {
        const payload = {
            subject: userObj.id,
            username: userObj.username,
            role: userObj.role
        };

        const options = {
            expiresIn: '900s',
        };
        return jwt.sign(payload, jwtSecret, options);
    }
};