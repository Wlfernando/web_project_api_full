const usersRouter = require('express').Router();
const {
  getUsers,
  getTheUser,
  updateUserMe,
  updateUserAvatar,
} = require('../handlers/handlersUser');
const { validateAvatar } = require('../utils/utils');

usersRouter.get('', getUsers);

usersRouter.get('/me', getTheUser);

usersRouter.patch('/me', updateUserMe);

usersRouter.patch('/me/avatar', validateAvatar(), updateUserAvatar);

module.exports = usersRouter;
