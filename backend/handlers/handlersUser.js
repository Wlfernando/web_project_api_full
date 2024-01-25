const User = require('../model/user');
const CastError = require('../utils/components/CastError');
const VoidError = require('../utils/components/VoidError');

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

function createUser( {body: {name, about, avatar, email, password }}, res) {
  User.create({ name, about, avatar, email, password })
    .then(() => res.send())
    .catch(req.haveError);
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
};
