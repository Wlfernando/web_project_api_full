const bcrypt = require('bcryptjs');
const User = require('../model/user');
const CastError = require('../utils/components/CastError');
const VoidError = require('../utils/components/VoidError');
const AuthError = require('../utils/components/AuthError')

function getUsers(req, res) {
  User.find({})
    .orFail(() => {
      throw new VoidError('No users.');
    })
    .then((users) => res.send(users))
    .catch(req.haveError);
}

function getTheUser(req, res) {
  User.findById(req.params.id)
    .then((user) => res.send(user))
    .catch((err) => {
      err.message = 'User not found.';
      err.statusCode = 404;

      req.haveError(err);
    });
}

function createUser( {body: { email, password }, haveError}, res) {
  bcrypt.hash(password, 10)
    .then(hash => User.create({ email, password: hash }))
    .then(user => res.send(user))
    .catch(haveError);
}

async function login({ body: { email, password }}, res, next) {
  const theUser = await User.findOne({ email })

  if (!theUser) {
    next(new AuthError('Incorrect password or email.'))
    return
  }

  const matched = await bcrypt.compare(password, theUser.password)

  if (!matched) {
    next(new AuthError('Incorrect password or email.'))
    return
  }

  res.send(theUser)
}

function updateUserMe(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true })
    .orFail(() => {
      throw new CastError('Has occurred a problem with the credencials')
    })
    .then(() => res.send())
    .catch(req.haveError);
}

function updateUserAvatar(req, res) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
    .orFail(() => {
      throw new CastError('Has occurred a problem with the credencials')
    })
    .then(() => res.send())
    .catch(req.haveError);
}

module.exports = {
  getUsers,
  getTheUser,
  createUser,
  updateUserMe,
  updateUserAvatar,
  login,
};
