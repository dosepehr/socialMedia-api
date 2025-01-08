const express = require('express');
const { addFollow } = require('./followController');
const protect = require('../../utils/middlewares/protect');

const followRouter = express.Router();

followRouter.route('/').post(protect, addFollow);

module.exports = followRouter;
