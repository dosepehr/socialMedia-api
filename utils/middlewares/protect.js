const expressAsyncHandler = require("express-async-handler");
const AppError = require("../classes/AppError");
const verifyToken = require("../funcs/verifyToken");

const protect = expressAsyncHandler(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.auth) {
        token = req.cookies.auth;
    }

    if (!token) {
        return next(new AppError('You are not logged in', 401));
    }

    // 2) Verification token
    const decoded = await verifyToken(token);
    // 3) check if user exists
    const currentUser = await User.findById(decoded?.id);
    if (!currentUser) {
        return next(new AppError('Invalid token', 401));
    }
    if (currentUser.ban) {
        return next(new AppError('Banned user', 403));
    }
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                'User recently changed password! Please log in again.',
                401,
            ),
        );
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    req.body.user = currentUser._id;
    next();
});

module.exports = protect;
