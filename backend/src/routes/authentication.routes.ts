import express, { Router } from 'express';

// Controller
import authentication from '../controllers/authentication.controller';

// Middleware
import validateResource from '../middlewares/validateResource.middleware';

// Schema
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from '../schema/user.schema';
import { loginUserSchema, getAccessTokenSchema } from '../schema/auth.schema';

const router: Router = express.Router();

router.route('/auth/register').post(validateResource(createUserSchema), authentication.register);
router.route('/auth/verify/:id/:verificationCode').get(validateResource(verifyUserSchema), authentication.verifyUser);
router.route('/auth/login').post(validateResource(loginUserSchema), authentication.login);
router.route('/auth/forgotPassword').post(validateResource(forgotPasswordSchema), authentication.forgotPassword);
router.route('/auth/resetPassword/:id/:passwordResetCode').post(validateResource(resetPasswordSchema), authentication.resetPassword);
router.route('/auth/refresh-token').post(validateResource(getAccessTokenSchema), authentication.getAccessToken);

export default router;