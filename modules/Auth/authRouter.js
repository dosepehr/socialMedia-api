const express = require('express');
const { signup, login } = require('./../Auth/authController');

const authRouter = express.Router();

authRouter.route('/signup').post(signup);
authRouter.route('/login').post(login);

module.exports = authRouter;
