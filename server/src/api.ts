import { Post, User } from "./types";

export type createPostRequest = Pick<Post, 'title' | 'url' | 'userId'>;
export type createPostResponse = {};

export type SignUpRequest = Pick<User, 'username' | 'firstName' | 'lastName' | 'email' | 'password'>;
export interface SignUpResponse {};


export interface SignInRequest {
    login : string; // username or email
    password : string;
}

export type SignInResponse = Pick<User, 'id' | 'username' | 'firstName' | 'lastName' | 'email'>;