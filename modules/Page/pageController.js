const { getOne } = require('../Factory/factoryController');
const User = require('../User/userModel');

exports.getPage = getOne(User, {}, [
    {
        path: 'posts',
    },
]);
