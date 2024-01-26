module.exports = function (req, res, next) {
  req.user = {
    _id: '65b32caeab751f9d015a08ce',
  };

  next();
};
