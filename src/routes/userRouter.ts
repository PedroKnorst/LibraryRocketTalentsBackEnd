import * as express from 'express';
import { postUser } from '../controler/userControler';

const userRouter = express.Router();

userRouter.post('/', postUser);

export default userRouter;
