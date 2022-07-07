const User = require('../models/user');

// возвращает всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

// возвращает пользователя по id
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.path === '_id') {
        res.status(400).send({ message: 'Некорректный ID' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
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
        res.status(400).send({ message: 'Некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

// обновляет профиль пользователя
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.path === '_id') {
        res.status(400).send({ message: 'Некорректный ID' });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

// обновляет аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.path === '_id') {
        res.status(400).send({ message: 'Некорректный ID' });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};
