import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import router from './routes'; // All routes
import connectToMongoDB from './config/db.config'; // DB connection
import log from './helpers/logger'; // Logger service

// Config environment variables
dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });

// Set up express server
const server: Express = express();
server.use(express.json()); // Accept JSON data
server.use(cors({ credentials: true })); // Enable CORS
server.use(compression()); // Compress responses
server.use(cookieParser()); // Parse cookies

// Connect to DB
connectToMongoDB()

const PORT: string | undefined = process.env.PORT || '5000';

// Log all requests using logger service (Should be at the beginning of all routes and middlewares)
server.use((req: Request, res: Response, next: NextFunction) => {
    log.info(`${req.url} (${req.method})`);
    next();
})

// API Routes
server.use('/api', router);

// Global Error Handler Middleware (Should be at the end of all routes and middlewares)
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    log.error(err.message); // Log errors for debugging

    const statusCode: number = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        error: err.message || 'Server Error',
    });
});

server.listen(PORT, () => {
    log.info(`⚡️ Server is running at http://localhost:${PORT}`)
})