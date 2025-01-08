const { addOne } = require('../Factory/factoryController');
const Post = require('./PostModel');

exports.addPost = addOne(Post);
