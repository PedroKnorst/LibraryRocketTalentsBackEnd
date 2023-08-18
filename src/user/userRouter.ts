import * as express from 'express';
import { postUser } from './userControler';

const userRouter = express.Router();

userRouter.post('/', postUser);

export default userRouter;
