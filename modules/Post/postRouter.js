const express = require('express');
const { addPost } = require('./postController');
const protect = require('../../utils/middlewares/protect');

const postRouter = express.Router();

postRouter.route('/').post(protect, addPost);

module.exports = postRouter;
