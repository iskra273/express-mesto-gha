const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
// const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

// для собирания JSON-формата
app.use(bodyParser.json());
// для приёма веб-страниц внутри POST-запроса
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

// авторизация временно
app.use((req, res, next) => {
  req.user = {
    _id: '62c6c8cf9e67cf21d119f706'
  };

  next();
});

app.use('/', usersRouter);
// app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Не найден' });
});

app.listen(PORT);
