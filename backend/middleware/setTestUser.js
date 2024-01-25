module.exports = function (req, res, next) {
  req.user = {
    _id: '6545bbfca99333f8640f9e04',
  };

  next();
};
