const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const regular = /(https?:\/\/)([www.]?[a-zA-Z0-9-]+\.)([^\s]{2,})/;

const {
  getUsers,
  getUser,
  getUserMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getUserMe);

usersRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
}), getUser);

usersRouter.patch('/users/me', celebrate({
  params: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
usersRouter.patch('/users/me/avatar', celebrate({
  params: Joi.object().keys({
    avatar: Joi.string().required().pattern(regular),
  }),
}), updateAvatar);

module.exports = usersRouter;
