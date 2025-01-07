const AppError = require("../classes/AppError");

const restrict = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    "you don't have permission to perform this action",
                    403,
                ),
            );
        }
        next();
    };
};

module.exports = restrict;
