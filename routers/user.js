import express from "express";
import { createUser, fetchAllUsers, getUser, updateUser, deleteUser } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/user/new', createUser);
userRouter.get("/users", fetchAllUsers);
userRouter.get("/users/:userId", getUser)
userRouter.put("/users/:userId", updateUser);
userRouter.delete("/users/:userId", deleteUser);

export default userRouter;