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

bookRouter.get("/", getBooks);
bookRouter.get("/history", getHistory);
bookRouter.get("/:id", getBook);
bookRouter.post("/", postBook);
bookRouter.put("/:id", putBook);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;
