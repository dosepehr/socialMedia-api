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

module.exports = User;
