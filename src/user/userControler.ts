import { Request, Response } from 'express';
import * as fs from 'fs';

let users = JSON.parse(fs.readFileSync('data.json', 'utf-8')).login;

interface User {
  name: string;
  email: string;
  password: string;
}

export const postUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: User = users.find((user: User) => user.email === email && user.password === password);

  if (user) res.status(404).json({ error: 'User not Found!' });

  return res.status(201).json(user.name);
};
