const usersRouter = require('express').Router();
const {
  getUsers,
  getTheUser,
  updateUserMe,
  updateUserAvatar,
} = require('../handlers/handlersUser');

usersRouter.get('', getUsers);

usersRouter.get('/:id', getTheUser);

usersRouter.patch('/me', updateUserMe);

usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
