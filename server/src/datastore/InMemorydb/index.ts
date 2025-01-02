import { DataStore } from '../';
import { Post, User, Comment, Like } from '../../types';

export class InMemoryDataStore implements DataStore {
    private users: User[] = [];
    private posts : Post[] = [];
    private comments : Comment[] = [];
    private likes : Like[] = [];

    //posts
    createPost(post: Post): Promise<void> {
        this.posts.push(post);
        return Promise.resolve();
    }
    getPostById(id: string): Promise<Post | undefined> {
        return Promise.resolve(this.posts.find(post => post.id === id));
    }
    getPostsByUserId(userId: string): Promise<Post[]> {
        return Promise.resolve(this.posts.filter(post => post.userId === userId));
    }
    deletePost(id: string): Promise<void> {
        const idx= this.posts.findIndex(post => post.id === id);
        if(idx === -1){
            return Promise.resolve();
        }
        this.posts.splice(idx, 1);
        return Promise.resolve();
    }
    getPosts(): Promise<Post[]> {
        return Promise.resolve(this.posts);
    }

    // users
    createUser(user: User): Promise<void> {
        this.users.push(user);
        return Promise.resolve();
    }
    getUserById(id: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(user => user.id === id));        
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(user => user.email === email));
    }

    // comments
    createComment(comment: Comment): Promise<void> {
        this.comments.push(comment);
        return Promise.resolve();
    }
    getCommentsByPostId(postId: string): Promise<Comment[]> {
        return Promise.resolve(this.comments.filter(comment => comment.postId === postId));

    }
    deleteComment(id: string): Promise<void> {
        const idx= this.comments.findIndex(comment => comment.id === id);
        if(idx === -1){
            return Promise.resolve();
        }
        this.comments.splice(idx, 1);
        return Promise.resolve();
    }
    updateComment(id:String, comment: Comment): Promise<void> {
        const idx= this.comments.findIndex(comment => comment.id === id);
        if(idx === -1){
            return Promise.resolve();
        }
        this.comments[idx] = comment;
        return Promise.resolve();
    }

    // likes
    createLike(like: Like): Promise<void> {
        this.likes.push(like);
        return Promise.resolve();
    }
    deleteLike(id: string): Promise<void> {
        const idx= this.likes.findIndex(like => like.id === id);
        if(idx === -1){
            return Promise.resolve();
        }
        this.likes.splice(idx, 1);
        return Promise.resolve();
    }

}