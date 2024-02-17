import { object, string } from 'zod';

export const loginSchema = object({
    email: string().min(1, 'Email is required').email('Email is not valid'),
    password: string().min(1, 'Password is required')
});

// export const registerSchema = object({
//     name: string({
//         required_error: 'Name is required'
//     }).min(1),
//     email: string({
//         required_error: 'Email is required'
//     }).email('Email is not valid'),
//     password: string({
//         required_error: 'Password is required'
//     }).min(6, 'Password should be min 6 characters'),
//     confirmPassword: string({
//         required_error: 'Confirm Password is required'
//     })
// }).refine((data) => data.password === data.confirmPassword, {
//     message: 'Passwords do not match',
//     path: ['confirmPassword']
// })