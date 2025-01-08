const express = require('express');
const { addPost } = require('./postController');
const protect = require('../../utils/middlewares/protect');
const uploader = require('../../utils/middlewares/uploader');
const { resizeImage } = require('../../utils/middlewares/imageProcess');
const postRouter = express.Router();

postRouter.route('/').post(
    protect, 
    uploader(
        [{ name: 'media', validExtensions: ['.png', '.jpg'] }],
        3 * 1024 * 124,
    ).single('media'),
    resizeImage,
    addPost,
);

module.exports = postRouter;
