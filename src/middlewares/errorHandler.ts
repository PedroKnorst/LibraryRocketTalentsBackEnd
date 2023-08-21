import { NextFunction, Request, Response } from 'express';

export default function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  return res.status(400).json({ error: err });
}
