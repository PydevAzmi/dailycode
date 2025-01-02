import { DataStore } from "..";
import path from 'path'
import sqlite3 from 'sqlite3'
import { Database, open as sqlOpen } from 'sqlite'
import { Post, User, Comment, Like } from "../../types";

export class sqlDataStore implements DataStore {
    private db!: Database<sqlite3.Database, sqlite3.Statement>;
    public async init () {
        this.db = await sqlOpen({
            filename:path.join(__dirname, 'db.sqlite'),
            driver: sqlite3.Database
        })
        await this.db.migrate({
            migrationsPath: path.join(__dirname, 'migrations')
        })
        return this;
    }

    async createPost(post: Post): Promise<void> {
        await this.db.run('INSERT INTO post (id, userId, url, title) VALUES (?,?,?,?)', [post.id, post.userId,post.url, post.title]);
    }
    getPostById(id: string): Promise<Post | undefined> {
        throw new Error("Method not implemented.");
    }
    getPostsByUserId(userId: string): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
    getPosts(): Promise<Post[]> {
        return this.db.all<Post[]>('SELECT * FROM post');
    }
    deletePost(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createUser(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getUserById(id: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    createComment(comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getCommentsByPostId(postId: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateComment(id: string, comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createLike(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteLike(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}