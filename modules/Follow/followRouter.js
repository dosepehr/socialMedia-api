const express = require('express');
const { addFollow, unfollow } = require('./followController');
const protect = require('../../utils/middlewares/protect');

const followRouter = express.Router();

followRouter.route('/').post(protect, addFollow);
followRouter.route('/unfollow').delete(protect, unfollow);

module.exports = followRouter;
