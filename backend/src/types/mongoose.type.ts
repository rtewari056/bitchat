export interface User {
    name: string,
    email: string,
    salt: string,
    verification_code: string,
    password: string,
    password_reset_code?: string;
    profile_pic: string,
    is_verified?: boolean
}
