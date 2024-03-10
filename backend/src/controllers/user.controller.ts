import { NextFunction, Request, Response } from 'express';
import db from '../services/user.service';
import dotenv from 'dotenv';
import path from 'path';
import { SearchUserInput } from '../schema/user.schema';

import { DecodedTokenData } from '../types';

dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });

// @description     Get all users
// @route           GET /api/users?search=&limit=
// @access          Private
const getAllUsers = async (req: Request<{}, {}, {}, SearchUserInput>, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
    try {
        
        const { search, limit } = req.query;

        const currentUser: DecodedTokenData = res.locals.user;

        // Get all users from our DB
        const users = await db.getUsersBySearchTerm(search, currentUser, limit).exec();

        return res.status(200).json({
            success: true,
            users
        });

    } catch (error: unknown) {
        return next(error);
    }
};

export default { getAllUsers };