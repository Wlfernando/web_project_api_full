module.exports = function (req, res, next) {
  req.haveError = function (err) {
    if (err.name === 'ValidationError') {
      const theErrors = Object
      .entries(err.errors)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value.message }), {});

      res.status(400).send(theErrors);
      return;
    }

    if ( err.name === 'CastError') {
      res.status(err.statusCode).send({ message: err.message });
      return;
    }

    res.status(500).send('Internal Error');
  };

  next();
};
