import express, { ErrorRequestHandler, RequestHandler } from 'express';
import moment from 'moment';
import { createPostHandler, listPostsHandler } from './handlers/postHandlers';
import asyncHandler from 'express-async-handler';
import { InitDB } from './datastore';
import { SignUpHandler } from './handlers/UserHandlers';

(async () => {
  await InitDB();
  const app = express();

  app.use(express.json());
  
  const requestLoggerHandler: RequestHandler = (req, res, next) => {
    console.log(`${moment().format('MM/DD/YYYY HH:mm:ss')} : [${res.statusCode}] ${req.method} ${req.path}`);
    next();
  };
  
  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error({ 'Uncaught Exeption Occured': err });
    res.status(500).send('Internal Server Error');
    next();
  };
  
  app.use(requestLoggerHandler);
  
  app.get('/v1/posts', asyncHandler(listPostsHandler));
  app.post('/v1/posts', asyncHandler(createPostHandler));
  app.post('/v1/signup', asyncHandler(SignUpHandler));
  app.use(errorHandler);
  
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})();

