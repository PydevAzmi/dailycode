import { PostDao } from './dao/PostDao';
import { UserDao } from './dao/UserDao';
import { CommentDao } from './dao/CommentDao';
import { LikeDao } from './dao/LikeDao';
import { sqlDataStore } from './sql';
export interface DataStore extends PostDao, UserDao, CommentDao, LikeDao {}

export let db: DataStore;

export async function InitDB(){
    // db = new InMemoryDataStore();
    db = await new sqlDataStore().init();
} 
