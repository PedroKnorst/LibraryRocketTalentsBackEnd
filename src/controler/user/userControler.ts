import { Request, Response } from 'express';
import * as fs from 'fs';
import { AppError } from '../../middlewares/errorHandler';

let users: User[] = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8')).login;

interface User {
  name: string;
  email: string;
  password: string;
}

export const postUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((user: User) => user.email === email && user.password === password);

  if (!user) {
    throw new AppError('Not Found', 404);
  }

  return res.json({ name: user.name, email: user.email });
};
