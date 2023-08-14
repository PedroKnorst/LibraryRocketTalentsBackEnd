import * as express from "express";
import { getUser, getUsers } from "./userControler";

const userRouter = express.Router();

userRouter.get("/users", getUsers);
userRouter.get("/users/:account", getUser);

export default userRouter;
