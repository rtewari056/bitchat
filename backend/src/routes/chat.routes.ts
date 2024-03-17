import express, { Router } from 'express';

// Controller
import chat from '../controllers/chat.controller';
import auth from '../middlewares/isAuthenticated.middleware';

// Middleware
import validateResource from '../middlewares/validateResource.middleware';
import { accessChatSchema, createGroupChatSchema, renameGroupChatSchema } from '../schema/chat.schema';

const router: Router = express.Router();

router.route('/chat')
    .get(auth.isAuthenticated, chat.fetchChat)
    .post(auth.isAuthenticated, validateResource(accessChatSchema), chat.accessChat);
router.route('/chat/group').post(auth.isAuthenticated, validateResource(createGroupChatSchema), chat.createGroupChat);
router.route('/chat/group/rename').put(auth.isAuthenticated, validateResource(renameGroupChatSchema), chat.renameGroupChat);

export default router;