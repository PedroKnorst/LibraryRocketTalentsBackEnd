import * as express from 'express';
import bookRouter from './routes/bookRouter';
import userRouter from './routes/userRouter';
import * as cors from 'cors';
import * as multer from 'multer';
import * as path from 'path';
import ErrorHandler from './middlewares/errorHandler';

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

app.use(express.static('public'));

app.use('/static', express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ dest: '../public', storage: storage });

app.post('/photos', upload.single('uploaded_file'), (req, res) => {
  console.log(req.file);

  const file = req.file?.filename;

  return res.json(file);
});

app.use(express.json());

app.use(ErrorHandler);

app.use('/books', bookRouter);
app.use('/users', userRouter);

export default app;
