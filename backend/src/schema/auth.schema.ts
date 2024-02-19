import { object, string, TypeOf } from 'zod';

const loginUserSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required'
        }).email('Invalid email or password'),
        password: string({
            required_error: 'Password is required'
        }).min(6, 'Invalid email or password')
    })
});

const getAccessTokenSchema = object({
    body: object({
        refreshToken: string({
            required_error: 'Refresh token is required'
        }),
    })
});

type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
type getAccessTokenInput = TypeOf<typeof getAccessTokenSchema>['body'];


export { loginUserSchema, LoginUserInput, getAccessTokenSchema, getAccessTokenInput };