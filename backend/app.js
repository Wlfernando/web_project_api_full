const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate')
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const notFound = require('./middleware/notFound');
const setTestUser = require('./middleware/setTestUser');
const hasError = require('./middleware/hasError');
const { validateMailAndPass } = require('./utils/utils');

const app = express();
const { PORT = 3000 } = process.env;
const allowedOrigins = [
  'http://localhost:3000',
  'https://around.nomoreparties.co',
  'http://around.nomoreparties.co',
];
const validator = validateMailAndPass()

app.use(cors({ origin: allowedOrigins }));

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');

app.use(express.json());

app.use(setTestUser);

app.use('/signup', validator, registerRouter);

app.use('/signin', validator, loginRouter)

app.use(errors())

app.use('/users', usersRouter);

app.use('/cards', cardsRouter);

app.use('*', notFound);

app.use(hasError)

app.listen(PORT);
