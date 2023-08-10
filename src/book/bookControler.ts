import * as fs from "fs";
import { Request, Response } from "express";

let data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

interface Loan {
  bookTitle?: string;
  studentName: string;
  class: string;
  withdrawalDate: string;
  deliveryDate: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: {
    isActive: boolean;
    description: string;
  };
  isBorrowed: boolean;
  image: string;
  systemEntryDate: string;
  synopsis: string;
  rentHistory: Loan[];
}

export const getBooks = (req: Request, res: Response) => {
  return res.json(data.books);
};

export const getBook = (req: Request, res: Response) => {
  const { id } = req.params;

  const bookIndex = data.books.findIndex((ind: Book) => ind.id === id);

  if (bookIndex < 0) {
    return res.status(404).json({ error: "Not Found" });
  }

  let book = data.books[bookIndex];

  return res.json(book);
};

export const getHistory = (req: Request, res: Response) => {
  const history: Loan[] = [];

  data.books.map((book: Book) => {
    book.rentHistory.map((user: Loan) => {
      user = {
        bookTitle: book.title,
        studentName: user.studentName,
        class: user.class,
        withdrawalDate: user.withdrawalDate,
        deliveryDate: user.deliveryDate,
      };

      history.push(user);
    });
  });

  return res.json(history);
};

export const postBook = (req: Request, res: Response) => {
  const {
    title,
    author,
    genre,
    status,
    image,
    systemEntryDate,
    synopsis,
    isBorrowed,
    rentHistory,
  } = req.body;

  let newId = Number.parseInt(data.books[data.books.length - 1].id) + 1;

  const book: Book = {
    id: newId.toString(),
    title,
    author,
    genre,
    status,
    image,
    systemEntryDate,
    synopsis,
    isBorrowed,
    rentHistory,
  };

  data.books.push(book);

  return res.status(201).json(data.books);
};

export const putBook = (req: Request, res: Response) => {
  const { id } = req.params;

  const {
    title,
    author,
    genre,
    status,
    image,
    systemEntryDate,
    synopsis,
    isBorrowed,
    rentHistory,
  } = req.body;

  const bookIndex = data.books.findIndex((ind: Book) => ind.id === id);

  if (bookIndex < 0) {
    return res.status(404).json({ error: "Not Found" });
  }

  if (
    !title ||
    !author ||
    !genre ||
    !status ||
    !image ||
    !systemEntryDate ||
    !synopsis ||
    !rentHistory
  ) {
    return res.status(400).json({ error: "Not enough informations" });
  }

  const book = {
    id: id,
    title,
    author,
    genre,
    status,
    image,
    systemEntryDate,
    synopsis,
    isBorrowed,
    rentHistory,
  };

  data.books[bookIndex] = book;

  return res.json(book);
};

export const deleteBook = (req: Request, res: Response) => {
  const { id } = req.params;

  const idBook = data.books.findIndex((ind: Book) => ind.id === id);

  if (idBook < 0) {
    return res.status(404).json({ error: "Not Found" });
  }

  data.books.splice(idBook, 1);

  return res.status(204).json(data.books);
};
