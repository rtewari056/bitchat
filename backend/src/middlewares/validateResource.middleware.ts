import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

const validateResource = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        })

        // If schema parsed successfully, call next()
        return next();
    } catch (error: unknown) {
        // If it's a zod validation error
        if(error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                error
            });
        }
        
        // Else return server error
        return next(error);
    }
};

export default validateResource;