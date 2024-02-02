require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const notFound = require('./middleware/notFound');
const hasError = require('./middleware/hasError');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { validateMailAndPass } = require('./utils/utils');
const authorize = require('./middleware/authorize');

const app = express();
const { PORT = 3000 } = process.env;
const allowedOrigins = [
  'https://www.balam.maya.se',
  'https://balam.maya.se',
  'http://www.balam.maya.se',
  'http://balam.maya.se',
  'https://localhost:3000',
  'http://localhost:3000',
];
const validator = validateMailAndPass();

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');

app.use(express.json());

app.use(cors({ origin: allowedOrigins }));

app.use(requestLogger);

app.use('/signup', validator, registerRouter);

app.use('/signin', validator, loginRouter);

app.use(authorize);

app.use('/users', usersRouter);

app.use('/cards', cardsRouter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer.');
  });
});

app.use('*', notFound);

app.use(errorLogger);

app.use(errors());

app.use(hasError);

app.listen(PORT);
