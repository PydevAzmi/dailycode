import { Post, User } from './types';

// Post
export type createPostRequest = Pick<Post, 'title' | 'url' | 'userId'>;
export type createPostResponse = {};

// user
export type SignUpRequest = Pick<User, 'username' | 'firstName' | 'lastName' | 'email' | 'password'>;
export interface SignUpResponse {}

export interface SignInRequest {
  login: string; // username or email
  password: string;
}
export type SignInResponse = Pick<User, 'id' | 'username' | 'firstName' | 'lastName' | 'email'>;

// comment

// post

// like
