import { Post, User } from './types';

// Post
export type createPostRequest = Pick<Post, 'title' | 'url' | 'userId'>;
export type createPostResponse = {post:Post};

export type listPostRequest = Pick<Post, 'title' | 'url' | 'userId'>;
export type listPostResponse = {posts:Post[]};


// user
export type SignUpRequest = Pick<User, 'username' | 'firstName' | 'lastName' | 'email' | 'password'>;
export type SignUpResponse ={
  token: string;
} 

export interface SignInRequest {
  login: string; // username or email
  password: string;
}
export type SignInResponse = {
  token: string;
}

// comment

// post

// like
