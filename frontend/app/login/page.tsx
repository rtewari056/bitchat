"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema
import { loginSchema } from '@/schema/Auth/auth.schema';

// Zod type
import { LoginForm } from '@/schema/Auth/auth.type';

export default function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema)
    });

    const handleSetValue = (): void => {
        setValue('email', 'guest@example.com', {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
        setValue('password', 'guest@123', {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    const onSubmit: SubmitHandler<LoginForm> = (data): void => {
        console.log('Form Submitted => ', data);
    }

    return (
        <main className="flex justify-center px-6 py-12 lg:px-8">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body gap-10">
                    <h2 className="card-title justify-center text-2xl font-bold tracking-tight">Sign in to your account</h2>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>

                        <label className="form-control w-full max-w-xs">
                            <div className={`input input-bordered flex ${errors.email ? 'input-error' : ''} items-center gap-2`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                <input type="text" placeholder="Email" className="grow" {...register('email')} />
                            </div>
                            {errors.email && <div className="label">
                                <span className="label-text-alt text-error">{errors.email?.message}</span>
                            </div>}
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className={`input input-bordered flex ${errors.password ? 'input-error' : ''} items-center gap-2`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                <input type="password" placeholder="Password" className="grow" {...register('password')} />
                            </div>
                            {errors.password && <div className="label">
                                <span className="label-text-alt text-error">{errors.password?.message}</span>
                            </div>}
                        </label>

                        <div className="card-actions">
                            <button type="submit" className="btn btn-primary w-full">Sign in</button>
                            <button type="button" className="btn btn-outline btn-secondary w-full" onClick={handleSetValue}>Get Guest User Credentials</button>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    )
}
