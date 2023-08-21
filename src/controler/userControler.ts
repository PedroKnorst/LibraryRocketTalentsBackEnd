import { Request, Response } from 'express';
import * as fs from 'fs';

let users: User[] = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8')).login;

interface User {
  name: string;
  email: string;
  password: string;
}

export const postUser = (req: Request, res: Response) => {
  const { email } = req.body;

  const user = users.find((user: User) => user.email === email);

  if (!user) {
    return res.status(404).json({ error: 'User not Found!' });
  }

  return res.status(201).json(user);
};
