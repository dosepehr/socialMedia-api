const express = require('express');
const { getPage } = require('./pageController');
const pageRouter = express.Router();

pageRouter.route('/:id').get(getPage);

module.exports = pageRouter;
