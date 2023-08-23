import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly code: number
  ) {
    super(message);
  }
}

export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof AppError) return res.status(err.code).json({ error: err.message });
  return res.status(500).json({ error: 'Internal Server Error' });
};
