const loginRouter = require('express').Router();
const { login } = require('../handlers/handlersUser');

loginRouter.post('', login);

module.exports = loginRouter;
