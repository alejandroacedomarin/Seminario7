import {Request, Response, NextFunction} from 'express'
var jwt = require('jsonwebtoken');

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json('Acces denied');

    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'token')

    console.log(payload);

    next();
}