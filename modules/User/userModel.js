const mongoose = require('mongoose');
const hashPassword = require('../../utils/funcs/hashPassword');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        biography: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: 'pathToDefaultProfileImage',
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        private: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);

userSchema.pre('save', async function (next) {
    this.password = await hashPassword(this.password);
    next();
});
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10,
        );

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};
const User = mongoose.model('User', userSchema);

userSchema.virtual('posts', {
    ref: 'Post', // Refers to the Post model
    foreignField: 'user', // Links to the 'user' field in the Post schema
    localField: '_id', // Matches the '_id' field of the User schema
});

module.exports = User;
