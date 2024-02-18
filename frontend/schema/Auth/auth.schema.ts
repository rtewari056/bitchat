import { any, custom, object, string } from 'zod';

// Global config
import { GLOBAL_CONFIG } from '@/config';

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
    }),
    profilePic: custom<FileList>()
        .refine((files) => files?.length !== 0, { 
            message: 'Image is required.' 
        })
        .refine((files) => GLOBAL_CONFIG.ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: 'Only .jpg, .jpeg, .png and .webp formats are supported.',
        })
        .refine((files) => files?.[0]?.size <= GLOBAL_CONFIG.MAX_FILE_SIZE, {
            message: 'The profile picture must be a maximum of 5MB.',
        })
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
})