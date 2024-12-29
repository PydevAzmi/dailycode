import { PostDao } from './PostDao';
import { UserDao } from './UserDao';
import { CommentDao } from './CommentDao';
import { LikeDao } from './LikeDao';
import { InMemoryDataStore } from './InMemorydb';
export interface DataStore extends PostDao, UserDao, CommentDao, LikeDao {}

export const db = new InMemoryDataStore();  