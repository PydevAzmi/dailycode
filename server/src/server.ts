import express, { ErrorRequestHandler, RequestHandler } from 'express';
import moment from 'moment';
import { createPostHandler, listPostsHandler } from './handlers/postHandlers';
import asyncHandler from 'express-async-handler';
import { InitDB } from './datastore';
import { SignInHandler, SignUpHandler } from './handlers/AuthHandlers';
import { requestLoggerHandler } from './middlewares/loggerMiddleware';
import { errorHandler } from './middlewares/errorMiddleware';
import { authHandler } from './middlewares/authMiddleware';
import dotenv from 'dotenv';

(async () => {
  dotenv.config();
  await InitDB();
  const app = express();

  app.use(express.json());
  app.use(requestLoggerHandler);

  app.post('/v1/signup', asyncHandler(SignUpHandler));
  app.post('/v1/signin', asyncHandler(SignInHandler));
  
  app.use(authHandler);

  app.get('/v1/posts', asyncHandler(listPostsHandler));
  app.post('/v1/posts', asyncHandler(createPostHandler));

  app.use(errorHandler);

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
})();
