import { RequestHandler } from "express";
import { verifyJWT } from "../handlers/AuthHandlers";
import { db } from "../datastore";
import { tokenPayload } from "../types";

export const authHandler :RequestHandler = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Missing token' });
        return;
    }
    try{
        const payload:tokenPayload= verifyJWT(token);
        const user = await db.getUserById(payload.id);
        if(!user){
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
        res.locals.userId = user.id;
    }catch{
        res.status(401).json({ error: 'Invalid token' });
        return;
    }
    
    next();
};