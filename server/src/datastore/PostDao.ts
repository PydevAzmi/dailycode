import {Post} from '../types';

export interface PostDao{
    createPost(post:Post):void;
    getPostById(id:string):Post | undefined;
    getPostsByUserId(userId:string):Post[];
    getPosts():Post[];
    deletePost(id:string):void;
}