const usersRouter = require('express').Router();

const {
  getUsers,
  getUser,
  getUserMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  validateUserId,
  validateUser,
  validateAvatar,
} = require('../middlewares/validator');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getUserMe);
usersRouter.get('/users/:userId', validateUserId, getUser);
usersRouter.patch('/users/me', validateUser, updateProfile);
usersRouter.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = usersRouter;
