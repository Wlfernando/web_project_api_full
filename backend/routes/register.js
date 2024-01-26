const registerRouter = require('express').Router();
const { createUser } = require('../handlers/handlersUser')

registerRouter.post('', createUser)

module.exports = registerRouter

