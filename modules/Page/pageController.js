const expressAsyncHandler = require('express-async-handler');
const Follow = require('../Follow/followModel');
const User = require('../User/userModel');

exports.getPage = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Use `Promise.all` to fetch user, posts, followers, and followings concurrently
    const [user, followersData, followingsData] = await Promise.all([
        User.findOne({ _id: id }).populate({ path: 'posts' }).lean(),
        Follow.find({ following: id })
            .populate('follower', 'username name _id')
            .lean(),
        Follow.find({ follower: id })
            .populate('following', 'username name _id')
            .lean(),
    ]);

    if (!user) {
        return res.status(404).json({
            status: false,
            message: 'Resource not found',
        });
    }

    // Process followers and followings
    const followers = followersData.map((f) => f.follower);
    const followings = followingsData.map((f) => f.following);

    // Build the response object
    res.status(200).json({
        status: true,
        data: {
            ...user,
            followers,
            followings,
        },
    });
});
