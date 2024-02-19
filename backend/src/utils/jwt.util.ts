import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });

// Types
import { DecodedTokenData } from '../types';

// Sign and return JWT token
const signJwt = (
    payload: Object,
    keyName: 'ACCESS_TOKEN_PRIVATE_KEY' | 'REFRESH_TOKEN_PRIVATE_KEY',
    options?: SignOptions | undefined
): string => {
    const privateKey: string = fs.readFileSync(path.resolve(process.cwd(), `src/keys/${keyName}.pem`), 'utf8');
    
    // ...(options && options) going to add the options object to the object, but only if options is defined
    return jwt.sign(payload, privateKey, { ...(options && options), algorithm: 'RS256' });
}

// Verify and return data from decoded token
const verifyJwt = (
    signedJwtToken: string,
    keyName: 'ACCESS_TOKEN_PUBLIC_KEY' | 'REFRESH_TOKEN_PUBLIC_KEY'
): DecodedTokenData | null => {
    const publicKey: string = fs.readFileSync(path.resolve(process.cwd(), `src/keys/${keyName}.pem`), 'utf8');

    try {
        return jwt.verify(signedJwtToken, publicKey) as DecodedTokenData;
    } catch (error) {
        return null;
    }
}

export { signJwt, verifyJwt }