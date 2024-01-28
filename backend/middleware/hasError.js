const reduceErrors = (err) => Object
  .entries(err.errors)
  .reduce((obj, [key, value]) => ({ ...obj, [key]: value.message }), {});

module.exports = function hasError(err, req, res, next) {
  switch (err.name) {
    case undefined:
      res.status(500).send({ message: 'Internal Error' });
      break;

    case 'ValidationError':
      res.status(400).send(reduceErrors(err));
      break;

    case 'MongoServerError':
      res.status(400).send({ message: 'Already registered.' });
      break;

    default:
      res.status(err.statusCode).send({ message: err.message });
  }
};
