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
// Create a compound index to enforce unique combination of follower and following
followSchema.index({ follower: 1, following: 1 }, { unique: true });
const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
