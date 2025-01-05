import { ErrorRequestHandler } from "express";

export  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error({ 'Uncaught Exeption Occured': err });
    res.status(500).send('Internal Server Error');
    next();
  };