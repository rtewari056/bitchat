export type User = {
    name: string;
    email: string;
}

export type RegisterResponse = {
    success: boolean;
    link: string;
    message: string;
}

export type LoginResponse = {
    success: boolean,
    id: string,
    name: string,
    email: string,
    profile_pic: string,
    accessToken: string,
    refreshToken: string,
    message: string
}