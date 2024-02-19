import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });

// Service
import db from '../services';

// Helper
import ErrorResponse from '../helpers/error.class';
import { verifyJwt } from '../utils/jwt.util';


const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // If authorization header not present set accesstoken to empty string else extract the token using regex
        const accessToken: string = (req.headers.authorization || '').replace(/^Bearer\s/, '');

        // Check if access token present or not
        if (!accessToken) {
            return next(new ErrorResponse('Not authorized to access this route', 401));
        }

        // Get decoded data from access token
        const decoded = verifyJwt(accessToken, 'ACCESS_TOKEN_PUBLIC_KEY');

        // If token verified and decoded successfully, set user object to res.locals for further use
        if (!decoded) {
            return next(new ErrorResponse('Not authorized to access this route', 401));
        }
        
        // Get existing user from decoded data extracted from access token
        const existingUser = await db.getUserByEmail(decoded.email);
        
        if (!existingUser) {
            return next(new ErrorResponse('Not authorized to access this route', 401));
        }
        
        // Set decoded data for further use
        res.locals.user = decoded;
        next();

    } catch (error: unknown) {
        return next(error);
    }
};

export default { isAuthenticated }