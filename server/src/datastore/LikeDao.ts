import {Like} from "../types";

export interface LikeDao{
    createLike(like:Like):void;
    deleteLike(id:string):void;
}