import express, { Request, Response, Router } from 'express';

import authentication from './authentication.routes'
import user from './user.routes'
import chat from './chat.routes'

const router: Router = express.Router();

// Health check endpoint
router.get('/', (_: Request, res: Response) => {
    res.send('<h1>HELLO FROM Express + TypeScript</h1>');
});

// Other routes
router.use(authentication); // Contains auth routes
router.use(user); // Contains user routes
router.use(chat); // Contains chat routes

export default router;