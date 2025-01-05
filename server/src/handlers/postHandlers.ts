import { RequestHandler } from 'express';
import { db } from '../datastore';
import { Post, ExpressHandler } from '../types';
import { createPostRequest, createPostResponse, listPostRequest, listPostResponse } from '../api';
import crypto from 'crypto';


export const createPostHandler: ExpressHandler<createPostRequest, createPostResponse> = async (req, res) => {
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
  await db.createPost(post);
  res.status(201).json({post});
};

export const listPostsHandler: ExpressHandler<listPostRequest, listPostResponse> = async (req, res) => {
  const posts = await db.getPosts();
  res.status(200).json({posts});
};
