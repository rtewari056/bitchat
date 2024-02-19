import express, { Router } from 'express';

import user from '../controllers/user.controller.js';
import auth from '../middlewares/isAuthenticated.middleware.js'

const router: Router = express.Router();

router.route('/data').get(auth.isAuthenticated, user.getAllUsers);

export default router;