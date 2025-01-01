import { RequestHandler } from 'express';
import { db } from '../datastore';
import { Post, ExpressHandler } from '../types';
import crypto from 'crypto';

type createPostRequest = Pick<Post, 'title' | 'url' | 'userId'>;
type createPostResponse = {};

export const createPostHandler: ExpressHandler<createPostRequest, createPostResponse> = (req, res) => {
  if (!req.body.title || !req.body.url || !req.body.userId) {
    res.status(400).json({ error: 'Missing post' });
    return;
  }
  const post: Post = {
    id: crypto.randomUUID(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
    createdAt: new Date().toISOString(),
  };
  db.createPost(post);
  res.status(201).json(post);
};

export const listPostsHandler: ExpressHandler<{}, {}> = (req, res) => {
  const posts = db.getPosts();
  res.status(200).json(posts);
};
