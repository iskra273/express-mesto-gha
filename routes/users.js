const usersRouter = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUser);
usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', updateProfile);
usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = usersRouter;
