import * as fs from 'fs';
import { Request, Response } from 'express';
import { AppError } from '../middlewares/errorHandler';
import { z } from 'zod';

let data = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));
let books: Book[] = data.books;

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

const bookParser = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  status: z.object({
    isActive: z.boolean(),
    description: z.string(),
  }),
  isBorrowed: z.boolean(),
  image: z.string(),
  systemEntryDate: z.string(),
  synopsis: z.string(),
  rentHistory: z.array(
    z.object({
      bookTitle: z.string(),
      studentName: z.string(),
      class: z.string(),
      withdrawalDate: z.string(),
      deliveryDate: z.string(),
    })
  ),
});

export const getBooks = (req: Request, res: Response) => {
  return res.json(books);
};

export const getBook = (req: Request, res: Response) => {
  const idParser = z.object({ id: z.string() });
  const parseParams = idParser.parse(req.params);
  const { id } = parseParams;

  const book = books.find((ind: Book) => ind.id === id);

  if (!book) {
    throw new AppError('Not Found', 404);
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
  const bookParser = z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    image: z.string(),
    systemEntryDate: z.string(),
    synopsis: z.string(),
  });

  const parserBody = bookParser.parse(req.body);
  const { title, author, genre, image, systemEntryDate, synopsis } = parserBody;

  let newId = Number.parseInt(books[books.length - 1].id) + 1;

  if (!title || !author || !genre || !image || !systemEntryDate || !synopsis) {
    throw new AppError('Not Enough Informations', 400);
  }

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

  fs.writeFileSync('./data/data.json', JSON.stringify(data, null, 2), 'utf-8');

  return res.status(201).json(book);
};

export const putBook = (req: Request, res: Response) => {
  const idParser = z.object({ id: z.string() });
  const parseParams = idParser.parse(req.params);
  const { id } = parseParams;

  const parserBody = bookParser.parse(req.body);
  const { title, author, genre, status, image, systemEntryDate, synopsis, isBorrowed, rentHistory } = parserBody;

  const bookIndex = books.findIndex((ind: Book) => ind.id === id);

  if (bookIndex < 0) {
    throw new AppError('Not Found', 404);
  }

  if (!title || !author || !genre || !status || !image || !systemEntryDate || !synopsis || !rentHistory) {
    throw new AppError('Not Enough Informations', 400);
  }

  const book = {
    id: id,
    title,
    author,
    genre,
    status,
    isBorrowed,
    image,
    systemEntryDate,
    synopsis,
    rentHistory,
  };

  books[bookIndex] = book;

  fs.writeFileSync('./data/data.json', JSON.stringify(data, null, 2), 'utf-8');

  return res.json(book);
};

export const deleteBook = (req: Request, res: Response) => {
  const idParser = z.object({ id: z.string() });
  const parseParams = idParser.parse(req.params);
  const { id } = parseParams;

  const idBook = books.findIndex((ind: Book) => ind.id === id);

  if (idBook < 0) {
    throw new AppError('Not Found', 404);
  }

  books.splice(idBook, 1);

  fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf-8');

  return res.status(204).json(books);
};
