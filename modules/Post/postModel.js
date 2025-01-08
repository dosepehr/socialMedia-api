const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    media: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    hashtags: {
        type: [String],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
