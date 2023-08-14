import { Request, Response } from "express";
import * as fs from "fs";

let data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

interface User {
  name: string;
  email: string;
  password: string;
}

export const getUsers = (req: Request, res: Response) => {
  return res.json(data.login);
};

export const getUser = (req: Request, res: Response) => {
  const { name }: User = req.body;

  const userIndex = data.login.findIndex((ind: User) => ind.name === name);

  const user = data.login[userIndex];

  return res.json(user);
};
