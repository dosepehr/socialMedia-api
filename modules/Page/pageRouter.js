const express = require('express');
const { getPage, getFollowings,getFollowers } = require('./pageController');
const pageRouter = express.Router();

pageRouter.route('/:id').get(getPage);
pageRouter.route('/:id/followings').get(getFollowings);
pageRouter.route('/:id/followers').get(getFollowers);
module.exports = pageRouter;
