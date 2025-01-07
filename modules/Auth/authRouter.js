const express = require('express');
const { signup } = require('./../Auth/authController');

const authRouter = express.Router();

authRouter.route('/signup').post(signup);

module.exports = authRouter;
