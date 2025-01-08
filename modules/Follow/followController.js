const expressAsyncHandler = require('express-async-handler');
const Follow = require('./followModel');

exports.addFollow = expressAsyncHandler(async (req, res, next) => {
    const follower = req.user._id;
    const { following } = req.body;

    await Follow.create({
        follower,
        following,
    });
    res.status(201).json({
        status: true,
        message: 'created',
    });
});
exports.unfollow = expressAsyncHandler(async (req, res, next) => {
    const follower = req.user._id;
    const { following } = req.body;

    await Follow.deleteOne({
        follower,
        following,
    });
    res.status(201).json({
        status: true,
        message: 'user unfollowed',
    });
});
