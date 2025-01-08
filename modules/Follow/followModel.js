const mongoose = require('mongoose');

const followSchema = new mongoose.Schema(
    {
        follower: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        following: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
