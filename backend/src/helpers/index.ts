import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });

const SECRET: string = process.env.PASSWORD_SECRET || 'Node-TypeScript-API';

/**
 * 
 * @returns Random token for password salt
 */
const random = (): string => crypto.randomBytes(128).toString('base64');

/**
 * 
 * @returns Generates a random UUID
 */
// Create random token
const getRandomUUID = (): string => crypto.randomUUID();


// Authentication util
const authentication = (salt: string, password: string): string => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};

export default { random, authentication, getRandomUUID }