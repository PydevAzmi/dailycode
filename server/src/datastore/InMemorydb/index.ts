import { DataStore } from '../';
import { Post, User, Comment, Like } from '../../types';

export class InMemoryDataStore implements DataStore {
    private users: User[] = [];
    private posts : Post[] = [];
    private comments : Comment[] = [];
    private likes : Like[] = [];

    //posts
    createPost(post: Post): void {
        this.posts.push(post);
    }
    getPostById(id: string): Post | undefined {
        return this.posts.find(post => post.id === id);
    }
    getPostsByUserId(userId: string): Post[] {
        return this.posts.filter(post => post.userId === userId);
    }
    deletePost(id: string): void {
        const idx= this.posts.findIndex(post => post.id === id);
        if(idx === -1){
            return;
        }
        this.posts.splice(idx, 1);
    }
    getPosts(): Post[] {
        return this.posts;
    }

    // users
    createUser(user: User): void {
        this.users.push(user);
    }
    getUserById(id: string): User | undefined {
        return this.users.find(user => user.id === id);        
    }
    getUserByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }

    // comments
    createComment(comment: Comment): void {
        this.comments.push(comment);
    }
    getCommentsByPostId(postId: string): Comment[] {
        return this.comments.filter(comment => comment.postId === postId);
    }
    deleteComment(id: string): void {
        const idx= this.comments.findIndex(comment => comment.id === id);
        if(idx === -1){
            return;
        }
        this.comments.splice(idx, 1);
    }
    updateComment(id:String, comment: Comment): void {
        const idx= this.comments.findIndex(comment => comment.id === id);
        if(idx === -1){
            return;
        }
        this.comments[idx] = comment;
    }

    // likes
    createLike(like: Like): void {
        this.likes.push(like);
    }
    deleteLike(id: string): void {
        const idx= this.likes.findIndex(like => like.id === id);
        if(idx === -1){
            return;
        }
        this.likes.splice(idx, 1);
    }

}