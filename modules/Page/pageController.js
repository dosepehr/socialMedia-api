const expressAsyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Follow = require('../Follow/followModel');
exports.getPage = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const data = await mongoose.model('User').aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Match the user by ID
        {
            $lookup: {
                from: 'posts', // Collection name for posts
                localField: '_id',
                foreignField: 'user',
                as: 'posts',
            },
        },
        {
            $lookup: {
                from: 'follows', // Collection name for follows
                localField: '_id',
                foreignField: 'following',
                as: 'followers',
            },
        },
        {
            $lookup: {
                from: 'follows', // Collection name for follows
                localField: '_id',
                foreignField: 'follower',
                as: 'followings',
            },
        },
        {
            $project: {
                _id: 1, // Include specific fields explicitly
                email: 1,
                username: 1,
                biography: 1,
                name: 1,
                profilePicture: 1,
                role: 1,
                private: 1,
                isVerified: 1,
                createdAt: 1,
                updatedAt: 1,
                posts: 1, // Include posts
                followers: {
                    $map: {
                        input: '$followers',
                        as: 'follower',
                        in: {
                            _id: '$$follower.follower',
                        },
                    },
                },
                followings: {
                    $map: {
                        input: '$followings',
                        as: 'following',
                        in: {
                            _id: '$$following.following',
                        },
                    },
                },
            },
        },
    ]);

    if (!data || data.length === 0) {
        return res.status(404).json({
            status: false,
            message: 'Resource not found',
        });
    }

    res.status(200).json({
        status: true,
        data: data[0], // Since aggregation returns an array, use the first element
    });
});

exports.getFollowings = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const followings = await Follow.find({
        following: id,
    })
        .populate({
            path: 'follower',
            model: 'User',
            select: 'profilePicture name username',
        })
        .lean()
        .select('-_id follower');

    const data = followings.map((follow) => follow.follower);
    
    res.status(200).json({
        status: true,
        data,
    });
});
exports.getFollowers = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const followers = await Follow.find({
        follower: id,
    })
        .populate({
            path: 'following',
            model: 'User',
            select: 'profilePicture name username',
        })
        .lean()
        .select('-_id following');

    const data = followers.map((follow) => follow.following);
    res.status(200).json({
        status: true,
        data,
    });
});
