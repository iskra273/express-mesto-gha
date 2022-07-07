const Card = require('../models/card');

// возвращает все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status.send({ data: card }))
    .catch((err) => next(err));
};

// создает карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;

  Card.create({ name, link, owner: id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

// удаляет карточку по идентификатору
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.path === '_id') {
        res.status(400).send({ message: 'Некорректный ID' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

// поставить лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.path === '_id') {
        res.status(400).send({ message: 'Некорректный ID' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

// убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.path === '_id') {
        res.status(400).send({ message: 'Некорректный ID' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};
