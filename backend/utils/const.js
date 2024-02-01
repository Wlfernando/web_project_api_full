const { JWT_SECRET, NODE_ENV } = process.env;
exports.key = NODE_ENV === 'production' ? JWT_SECRET : 'chanchito';