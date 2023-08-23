import { Request, Response } from 'express';
import * as fs from 'fs';
import { AppError } from '../middlewares/errorHandler';
import { z } from 'zod';

let users: User[] = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8')).login;

interface User {
  name: string;
  email: string;
  password: string;
}

const userParser = z.object({
  email: z.string(),
  password: z.string(),
});

export const postUser = (req: Request, res: Response) => {
  const bodyParser = userParser.parse(req.body);
  const { email, password } = bodyParser;

  const user = users.find((user: User) => user.email === email && user.password === password);

  if (!user) {
    throw new AppError('Not Found', 404);
  }

  return res.status(201).json(user);
};
