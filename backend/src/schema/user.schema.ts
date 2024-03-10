import { number, object, string, TypeOf } from 'zod';

const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        email: string({
            required_error: 'Email is required'
        }).email('Email is not valid'),
        password: string({
            required_error: 'Password is required'
        }).min(6, 'Password should be min 6 characters'),
        confirmPassword: string({
            required_error: 'Confirm Password is required'
        }),
        profilePic: string({
            required_error: 'Profile picture is required'
        })
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    })
});

const verifyUserSchema = object({
    params: object({
        id: string(),
        verificationCode: string()
    })
});

const forgotPasswordSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required'
        }).email('Email is not valid'),
    })
});

const resetPasswordSchema = object({
    params: object({
        id: string(),
        passwordResetCode: string()
    }),
    body: object({
        password: string({
            required_error: 'Password is required'
        }).min(6, 'Password should be min 6 characters'),
        confirmPassword: string({
            required_error: 'Confirm Password is required'
        })
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    })
});

const searchUserSchema = object({
    query: object({
        search: string().optional(),
        limit: number().optional()
    })
});

type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
type forgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
type resetPasswordInput = TypeOf<typeof resetPasswordSchema>;
type SearchUserInput = TypeOf<typeof searchUserSchema>['query'];


export { createUserSchema, CreateUserInput, verifyUserSchema, VerifyUserInput, forgotPasswordSchema, forgotPasswordInput, resetPasswordSchema, resetPasswordInput, searchUserSchema, SearchUserInput };