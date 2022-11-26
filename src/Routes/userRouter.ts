import express from "express";
import {
  getUserByEmail,
  getUserById,
  getUsers,
  postUser,
} from "../controler/userControler";
import validate from "../middleware/validate";
import { userSchema } from "../schemas/userSchema";

export const userRouter = express();

userRouter.get(`/`, getUsers);

userRouter.post(`/`, validate(userSchema), postUser);

userRouter.get(`/search/:id`, getUserById);
userRouter.get(`/search/email/:email`, getUserByEmail);
