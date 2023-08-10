import { Request, Response } from "express";
import * as fs from "fs";

let data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

export const getUsers = (req: Request, res: Response) => {
  return res.json(data.login);
};
