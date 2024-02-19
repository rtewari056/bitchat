import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import router from './routes';

// Config environment variables
dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });

const server: Express = express();
server.use(express.json()); // Accept JSON data
const PORT: string | undefined = process.env.PORT || '5000';

server.use(cors({ credentials: true })); // Enable CORS
server.use(compression()); // Compress responses
server.use(cookieParser()); // Parse cookies

// API Routes
server.use('/api', router);

// Global Error Handler Middleware (Should be at the end of all middlewares)
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);

    const statusCode: number = err.statusCode || 500;
    const errorMessage: string = err.message || 'Server Error';

    return res.status(statusCode).json({
        success: false,
        error: errorMessage,
    });
});

server.listen(PORT, () => {
    console.log(`⚡️ Server is running at http://localhost:${PORT}`);
})