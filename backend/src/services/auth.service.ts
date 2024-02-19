import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });

import { TokenSigningPayload } from '../types';
import { signJwt } from '../utils/jwt.util';

// Sign and return the access token 
const signAccessToken = (data: TokenSigningPayload): string => {
    const accessToken: string = signJwt(data, 'ACCESS_TOKEN_PRIVATE_KEY', {
        expiresIn: process.env.ACCESS_TOKEN_TTL as string
    });

    return accessToken;
}

// Sign and return the refresh token 
const signRefreshToken = (data: TokenSigningPayload) => {
    const refreshToken = signJwt(data, 'REFRESH_TOKEN_PRIVATE_KEY', {
        expiresIn: process.env.REFRESH_TOKEN_TTL as string
    });

    return refreshToken;
}

export default { signAccessToken, signRefreshToken }