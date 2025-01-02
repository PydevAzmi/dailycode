import { Comment } from "../../types";

export interface CommentDao{
    createComment(comment:Comment):Promise<void>;
    getCommentsByPostId(postId:string):Promise<Comment[]>;
    deleteComment(id:string):Promise<void>;
    updateComment(id:string, comment:Comment):Promise<void>;
}