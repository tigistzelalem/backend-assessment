import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();


export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization
    if (!token) {
        res.status(404).json({ message: 'no token provided' });

    }

    jwt.verify(token, process.env.SECRET, (err: any, decoded: any) => {

        try {
            if (err) {
                return res.status(400).json({
                    message: "Invalid token"
                });
            }
            req.user = {
                id: decoded.id,

            }
            next();
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }


    })


}