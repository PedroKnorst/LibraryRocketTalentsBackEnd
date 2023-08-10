import * as express from "express";
import {
  deleteBook,
  getBook,
  getBooks,
  getHistory,
  postBook,
  putBook,
} from "./bookControler";

const bookRouter = express.Router();

bookRouter.get("/books", getBooks);
bookRouter.get("/books/history", getHistory);
bookRouter.get("/books/:id", getBook);
bookRouter.post("/books", postBook);
bookRouter.put("/books/:id", putBook);
bookRouter.delete("/books/:id", deleteBook);

export default bookRouter;
