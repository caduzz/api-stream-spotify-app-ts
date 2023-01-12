import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { authConfig } from '../configs/auth';
import { tokenValidate } from '../services/token';

export const secret = (req: Request, res: Response, next: NextFunction) => {
    const hash = req.query.secret_api;

    if( hash !== authConfig.secret_api )
        return res.status(401).json({ error: 'Invalid access' });

    return next();
}
export const auth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader)
        return res.json({ error: 'No token provided' }).status(401)
    const token = tokenValidate(authHeader)
    if(!token?.error) return next()
}