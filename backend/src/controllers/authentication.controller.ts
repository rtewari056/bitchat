import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });

// Helper
import helper from '../helpers';
import ErrorResponse from '../helpers/error.class';

// Service
import db from '../services/user.service';
import authService from '../services/auth.service';

// Util
import sendEmail from '../utils/mailer.util';
import { verifyJwt } from '../utils/jwt.util';

// Zod Type
import { CreateUserInput, VerifyUserInput, forgotPasswordInput, resetPasswordInput } from '../schema/user.schema';
import { getAccessTokenInput, LoginUserInput } from '../schema/auth.schema';

// Custom Type
import { TokenSigningPayload } from '../types';

// @description     Register a user
// @route           POST /api/auth/register
// @access          Public
const register = async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
    try {
        const { name, email, password, profilePic } = req.body;

        // Check if user already exists in our DB
        const userExists = await db.getUserByEmail(email).exec();

        if (userExists) {
            return next(new ErrorResponse('User already exists', 400));
        }

        // Create password salt and verification code
        const salt: string = helper.random();
        const verificationCode: string = helper.getRandomUUID();

        // Register and store the new user
        const user = await db.createUser({
            name,
            email,
            salt,
            password: helper.authentication(salt, password),
            verification_code: verificationCode,
            profile_pic: profilePic
        });

        // Create email verification url
        const verifyUserURL: string = `http://${req.headers.host}/api/auth/verify/${user.id}/${verificationCode}`;

        // User verification email template in HTML
        const HTML: string = `
            <p>Please go to this link to verify your email:</p>
            <a href=${verifyUserURL} clicktracking=off>${verifyUserURL}</a>
        `;

        // Send email
        // await sendEmail({
        //     from: `Node-TypeScript-API <${process.env.EMAIL_FROM}>`,
        //     to: email,
        //     subject: 'Email Verification',
        //     text: `Hello,\n Welcome. Please click on the link to verify your account.\n${verifyUserURL}`,
        //     HTML,
        // });

        return res.status(201).json({
            success: true,
            link: verifyUserURL,
            message: 'Email Verification link sent to your email'
        });
    } catch (error: unknown) {
        return next(error);
    }
};

// @description     Verify a user
// @route           GET /api/auth/verify/:id/:verificationCode
// @access          Public
const verifyUser = async (req: Request<VerifyUserInput>, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {

    const { id, verificationCode } = req.params;

    try {
        // Check if user is registered and not verified
        const userExists = await db.getUserById(id).select('+verification_code').exec(); // Also include unselected field(s)

        // If user does not exists or verification codes are not same
        if (!userExists || userExists.verification_code !== verificationCode) {
            return next(new ErrorResponse('Invalid link', 400));
        }

        // Update user verification status and clear verification code field
        await db.updateUserById(userExists.id, { is_verified: true, verification_code: null });

        // Get the updated user details
        // const updatedUser = await db.getUserByEmail(id);

        return res.status(200).json({
            success: true,
            message: 'You are verified'
        });

    } catch (error: unknown) {
        return next(error);
    }
};

// @description     Forgot password
// @route           POST /api/auth/forgotPassword
// @access          Public
const forgotPassword = async (req: Request<{}, {}, forgotPasswordInput>, res: Response, next: NextFunction) => {
    const { email } = req.body;

    try {
        const user = await db.getUserByEmail(email);

        // Check if user is not registered or unverified
        if (!user || !user.is_verified) {
            return next(new ErrorResponse('Email could not be sent', 400));
        }

        // Generate a password reset code 
        const passwordResetCode: string = helper.getRandomUUID();

        // Update password reset code
        await db.updateUserById(user.id, { password_reset_code: passwordResetCode });

        // Create forgot password url
        const resetPasswordURL: string = `http://${req.headers.host}/api/auth/resetPassword/${user.id}/${passwordResetCode}`;

        // Forgot password email template in HTML
        const HTML: string = `
            <p>Please go to this link to reset your password:</p>
            <a href=${resetPasswordURL} clicktracking=off>${resetPasswordURL}</a>
        `;

        // Send email
        // await sendEmail({
        //     from: `BitChat <${process.env.EMAIL_FROM}>`,
        //     to: email,
        //     subject: 'Forgot password',
        //     text: `Hello,\n Welcome. Please go to this link to reset your password.\n${resetPasswordURL}`,
        //     HTML,
        // });

        return res.status(200).json({
            success: true,
            link: HTML,
            message: 'Reset password link sent to your email'
        });

    } catch (error: unknown) {
        return next(error);
    }
};

// @description     Reset password
// @route           POST /api/auth/resetPassword/:id/:passwordResetCode
// @access          Public
const resetPassword = async (req: Request<resetPasswordInput['params'], {}, resetPasswordInput['body']>, res: Response, next: NextFunction) => {
    const { id, passwordResetCode } = req.params;
    const { password } = req.body;

    try {
        const user = await db.getUserById(id).select('+password_reset_code').exec(); // Also include unselected field(s)

        // Check if user is registered, having password reset code and it matches with code sent by the user
        if (!user || !user.password_reset_code || user.password_reset_code !== passwordResetCode) {
            return next(new ErrorResponse('Password could not be reset', 400));
        }

        const salt: string = helper.random();

        // Update password reset code to null so it can't be used anymore and change user password and salt to new one
        await db.updateUserById(user.id, { password_reset_code: null, salt, password: helper.authentication(salt, password) });

        return res.status(200).json({
            success: true,
            message: 'Password reset successful'
        });

    } catch (error: unknown) {
        return next(error);
    }
};

// @description     Login a user
// @route           POST /api/auth/login
// @access          Public
const login = async (req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const user = await db.getUserByEmail(email).select('+password +salt').exec(); // Also include unselected field(s)
        // log.info(user?.toJSON())

        // Check if user is present in our database without letting the user know if he/she is registered or not 
        if (!user) {
            return next(new ErrorResponse('Invalid email or password', 403));
        }

        if (!user.is_verified) {
            return next(new ErrorResponse('Please verify your email', 400));
        }

        // Create hashed password using saved salt and password of user
        const expectedHash: string = helper.authentication(user.salt, password);

        // If expected hashed password and saved hashed password not matches
        if (user.password !== expectedHash) {
            return next(new ErrorResponse('Invalid email or password', 403));
        }

        // Token creation payload
        const payload: TokenSigningPayload = {
            id: user.id,
            email: user.email,
            name: user.name
        };

        // Sign a access token
        const accessToken: string = authService.signAccessToken(payload);

        // Sign a refresh token
        const refreshToken: string = authService.signRefreshToken(payload);

        // Send the tokens
        return res.status(200).json({
            success: true,
            id: user._id,
            name: user.name,
            email: user.email,
            profile_pic: user.profile_pic,
            accessToken,
            refreshToken,
            message: 'Login successfully'
        });

    } catch (error: unknown) {
        return next(error);
    }
}

// @description     Get an access token
// @route           POST /api/auth/refresh-token
// @access          Public
const getAccessToken = async (req: Request<{}, {}, getAccessTokenInput>, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;

    try {

        if (!refreshToken) {
            return next(new ErrorResponse('Not authorized to access this route', 401));
        }

        // Get decoded data from refresh token
        const decoded = verifyJwt(refreshToken, 'REFRESH_TOKEN_PUBLIC_KEY');

        // If token verified and decoded successfully, set user object to res.locals for further use
        if (!decoded) {
            return next(new ErrorResponse('Not authorized to access this route', 401));
        }

        // Token creation payload
        const payload: TokenSigningPayload = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name
        };

        // Sign a access token
        const newAccessToken: string = authService.signAccessToken(payload);

        // Sign a refresh token
        const newRefreshToken: string = authService.signRefreshToken(payload);

        // Send the tokens
        return res.status(201).json({
            success: true,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            message: 'New tokens generated successfully'
        });

    } catch (error: unknown) {
        return next(error);
    }
}

export default { register, verifyUser, login, forgotPassword, resetPassword, getAccessToken };