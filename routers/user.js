const express = require('express');
const { createUser, fetchAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/user/new', createUser);
userRouter.get("/users", fetchAllUsers);
userRouter.get("/users/:userId", getUser)
userRouter.put("/users/:userId", updateUser);
userRouter.delete("/users/:userId", deleteUser);

module.exports = userRouter;