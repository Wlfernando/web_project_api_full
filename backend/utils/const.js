const { JWT_SECRET, NODE_ENV } = process.env;

exports.key = NODE_ENV === 'production' ? JWT_SECRET : 'chanchito';

exports.allowedOrigins = [
  'https://www.balam.maya.se',
  'https://balam.maya.se',
  'http://www.balam.maya.se',
  'http://balam.maya.se',
  'https://localhost:3000',
  'http://localhost:3000',
];
