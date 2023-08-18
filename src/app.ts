import * as express from 'express';
import bookRouter from './book/bookRouter';
import userRouter from './user/userRouter';
import * as cors from 'cors';

const app = express();

app.use(express.static('public'));

app.use('/static', express.static('public'));

app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());

app.use('/books', bookRouter);
app.use('/users', userRouter);

export default app;
