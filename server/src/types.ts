import { RequestHandler } from "express";

export interface User {
    id: string;
    userName: string;
    firstName: string;
    lastname: string;
    email: string;
    password: string;
}

export interface Post {
    id: string;
    title: string;
    url: string;
    userId: string;
    createdAt: string;
}

export interface Comment {
    id: string;
    content: string;
    postId: string;
    userId: string;
    createdAt: string;
}

export interface Like {
    id: string;
    postId: string;
    userId: string;
}

export type ExpressHandler<req,res> = RequestHandler<
    string,
    Partial<res>,
    Partial<req>,
    any
    >

    
export type createPostRequest = Pick<Post, 'title' | 'url' | 'userId'>;  
export type createPostResponse = {}; 