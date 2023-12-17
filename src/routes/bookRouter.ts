import * as express from 'express';
import { deleteBook, getBook, getBooks, getHistory, postBook, patchBook } from '../controler/book/bookControler';

const bookRouter = express.Router();

bookRouter.get('/', getBooks);
bookRouter.get('/history', getHistory);
bookRouter.get('/:id', getBook);
bookRouter.post('/', postBook);
bookRouter.patch('/:id', patchBook);
bookRouter.delete('/:id', deleteBook);

export default bookRouter;
