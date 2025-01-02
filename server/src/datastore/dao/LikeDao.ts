import {Like} from "../../types";

export interface LikeDao{
    createLike(like:Like):Promise<void>;
    deleteLike(id:string):Promise<void>;
}