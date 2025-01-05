import { RequestHandler } from "express";
import moment from "moment";

export  const requestLoggerHandler: RequestHandler = (req, res, next) => {
    console.log(`${moment().format('MM/DD/YYYY HH:mm:ss')} : [${res.statusCode}] ${req.method} ${req.path}`);
    next();
  };
