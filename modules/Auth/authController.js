const expressAsyncHandler = require('express-async-handler');
const User = require('../User/userModel');
const signToken = require('../../utils/funcs/signToken');
const Email = require('../../utils/classes/Email');

exports.signup = expressAsyncHandler(async (req, res, next) => {
    const JWT_EXPIRES = +process.env.JWT_EXPIRES.slice(0, 2);
    const userData = {
        email: req.body.email,
        username: req.body.username,
        biography: req.body.biography,
        name: req.body.name,
        password: req.body.password,
    };
    // TODO validation
    const newUser = await User.create(userData);
    const token = signToken({ id: newUser._id });
    await new Email({ email: newUser.email }, '').sendWelcome();
    res.cookie('auth', `Bearer ${token}`, {
        expires: new Date(Date.now() + JWT_EXPIRES * 24 * 60 * 60 * 1000),
        secure: req.secure, // if https was on
        httpOnly: true,
    })
        .status(201)
        .json({
            status: true,
            token,
        });
});
