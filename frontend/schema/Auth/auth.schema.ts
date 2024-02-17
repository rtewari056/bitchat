import { object, string } from 'zod';

export const loginSchema = object({
    email: string().min(1, 'Email is required').email('Email is not valid'),
    password: string().min(1, 'Password is required')
});

export const registerSchema = object({
    name: string().min(1, 'Name is required'),
    email: string().min(1, 'Email is required').email('Email is not valid'),
    password: string({
        required_error: 'Password is required'
    }).min(8, 'Password should be min 8 characters'),
    confirmPassword: string({
        required_error: 'Confirm Password is required'
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
})