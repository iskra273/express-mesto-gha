const User = require('../models/user');
const { NOT_FOUND, SERVER_ERROR, BAD_REQUEST } = require('../errors/errors');

// возвращает всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

// возвращает пользователя по id
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.path === '_id') {
        res.status(BAD_REQUEST).send({ message: 'Некорректный ID' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

// создает пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  // записываем данные в базу
  User.create({ name, about, avatar })
    // возвращаем записанные в базу данные пользователю
    .then((user) => res.send({ data: user }))
    // если данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

// обновляет профиль пользователя
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.path === '_id') {
        res.status(BAD_REQUEST).send({ message: 'Некорректный ID' });
      } else if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

// обновляет аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.path === '_id') {
        res.status(BAD_REQUEST).send({ message: 'Некорректный ID' });
      } else if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};
