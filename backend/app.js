const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate')
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const registerRouter = require('./routes/register');
const notFound = require('./middleware/notFound');
const setTestUser = require('./middleware/setTestUser');
const haveError = require('./middleware/haveError');
const { validateMailAndPass } = require('./utils/utils')

const app = express();
const { PORT = 3000 } = process.env;
const allowedOrigins = [
  'http://localhost:3000',
  'https://around.nomoreparties.co',
  'http://around.nomoreparties.co',
];

app.use(cors({ origin: allowedOrigins }));

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');

app.use(express.json());

app.use(setTestUser);

app.use(haveError);

app.use('/signup', validateMailAndPass, registerRouter);

app.use(errors())

app.use('/users', usersRouter);

app.use('/cards', cardsRouter);

app.use('*', notFound);

app.listen(PORT);
