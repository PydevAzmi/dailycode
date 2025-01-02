import {Post} from '../../types';

export interface PostDao{
    createPost(post:Post):Promise<void>;
    getPostById(id:string): Promise<Post | undefined>;
    getPostsByUserId(userId:string): Promise<Post[]>;
    getPosts(): Promise<Post[]>;
    deletePost(id:string):Promise<void>;
}