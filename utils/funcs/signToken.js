const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES;

const signToken = (payload) => {
    const token = jwt.sign(payload, secretKey, {
        expiresIn,
    });
    return token;
};

module.exports = signToken;
