import * as fs from 'fs';
import { Request, Response } from 'express';

let books = JSON.parse(fs.readFileSync('data.json', 'utf-8')).books;

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
  return res.json(books);
};

export const getBook = (req: Request, res: Response) => {
  const { id } = req.params;

  const book = books.find((ind: Book) => ind.id === id);

  if (!book) {
    return res.status(404).json({ error: 'Book not Found' });
  }

  return res.json(book);
};

export const getHistory = (req: Request, res: Response) => {
  const history: Loan[] = [];

  books.forEach((book: Book) => {
    book.rentHistory.forEach((loan: Loan) => {
      const loanHistory = {
        bookTitle: book.title,
        studentName: loan.studentName,
        class: loan.class,
        withdrawalDate: loan.withdrawalDate,
        deliveryDate: loan.deliveryDate,
      };

      history.push(loanHistory);
    });
  });

  return res.json(history);
};

export const postBook = (req: Request, res: Response) => {
  const { title, author, genre, image, systemEntryDate, synopsis } = req.body;

  let newId = Number.parseInt(books[books.length - 1].id) + 1;

  const book: Book = {
    id: newId.toString(),
    title,
    author,
    genre,
    status: {
      isActive: true,
      description: '',
    },
    image,
    systemEntryDate,
    synopsis,
    isBorrowed: false,
    rentHistory: [],
  };

  books.push(book);

  return res.status(201).json(book);
};

export const putBook = (req: Request, res: Response) => {
  const { id } = req.params;

  const { title, author, genre, status, image, systemEntryDate, synopsis, isBorrowed, rentHistory } = req.body;

  const bookIndex = books.findIndex((ind: Book) => ind.id === id);

  if (bookIndex < 0) {
    return res.status(404).json({ error: 'Not Found' });
  }

  if (!title || !author || !genre || !status || !image || !systemEntryDate || !synopsis || !rentHistory) {
    return res.status(400).json({ error: 'Not enough informations' });
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

  books[bookIndex] = book;

  return res.json(book);
};

export const deleteBook = (req: Request, res: Response) => {
  const { id } = req.params;

  const idBook = books.findIndex((ind: Book) => ind.id === id);

  if (idBook < 0) {
    return res.status(404).json({ error: 'Not Found' });
  }

  books.splice(idBook, 1);

  return res.status(204).json(books);
};
