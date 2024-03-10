import express, { Router } from 'express';

import chat from '../controllers/chat.controller.js';
import auth from '../middlewares/isAuthenticated.middleware.js'

const router: Router = express.Router();

router.route('/chat').get(auth.isAuthenticated, chat.accessChat).post(auth.isAuthenticated, chat.accessChat);
// router.route('/group').post(auth.isAuthenticated, chat.createGroupChat);

export default router;