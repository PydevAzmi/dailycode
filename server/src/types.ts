import { RequestHandler } from "express";

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
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

export type WithError<T> = T & { error: string };

export type ExpressHandler<req,res> = RequestHandler<
    string,
    Partial<WithError<res>>,
    Partial<WithError<req>>,
    any
    >

export type tokenPayload = {
    id: string;
    username: string;
}

    