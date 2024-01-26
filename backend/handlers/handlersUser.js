const bcrypt = require('bcryptjs');
const User = require('../model/user');
const CastError = require('../utils/components/CastError');
const VoidError = require('../utils/components/VoidError');

function getUsers(req, res, next) {
  User.find({})
    .orFail(() => {
      throw new VoidError('No users.');
    })
    .then((users) => res.send(users))
    .catch(next);
}

function getTheUser(req, res, next) {
  User.findById(req.params.id)
    .then((user) => res.send(user))
    .catch(() => {
      next(new CastError('User not Found.'))
    });
}

function createUser({ body: { email, password }}, res, next) {
  bcrypt.hash(password, 10)
    .then(hash => User.create({ email, password: hash }))
    .then(user => res.send(user))
    .catch(next);
}

function login({ body: { email, password }}, res, next) {
  User.findUserByCredencials({ email, password })
    .then(user => res.send(user))
    .catch(next)
}

function updateUserMe(req, res, next) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true })
    .orFail(() => {
      throw new CastError('Has occurred a problem with the credencials')
    })
    .then(() => res.send())
    .catch(next);
}

function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
    .orFail(() => {
      throw new CastError('Has occurred a problem with the credencials')
    })
    .then(() => res.send())
    .catch(next);
}

module.exports = {
  getUsers,
  getTheUser,
  createUser,
  updateUserMe,
  updateUserAvatar,
  login,
};
