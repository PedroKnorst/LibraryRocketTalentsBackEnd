import * as express from "express";
import { getUsers } from "./userControler";

const userRouter = express.Router();

userRouter.get("/users", getUsers);

export default userRouter;
