"use client";

import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema
import { registerSchema } from "@/schema/Auth/auth.schema";

// Zod type
import { RegisterForm } from "@/schema/Auth/auth.type";
import Image from "next/image";
import { GLOBAL_CONFIG } from "@/config";

export default function Register() {

    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null); // Default image for preview

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit: SubmitHandler<RegisterForm> = (data): void => {
        console.log('Form Submitted => ', data);
    }

    const handleProfilePic = (e: ChangeEvent): void => {
        const target = e.target as HTMLInputElement;
        const profilePic: File = (target.files as FileList)[0]; // Get the file

        // Check file type and file size
        if (!GLOBAL_CONFIG.ACCEPTED_IMAGE_TYPES.includes(profilePic?.type) || profilePic?.size >= GLOBAL_CONFIG.MAX_FILE_SIZE) {
            setImagePreview(null);
            return;
        }

        // Image preview logic
        const reader = new FileReader();
        reader.readAsDataURL(profilePic);
        reader.onload = () => setImagePreview(reader.result);
    }

    return (
        <main className="flex justify-center px-6 py-12 lg:px-8">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body gap-10">
                    <h2 className="card-title justify-center text-2xl font-bold tracking-tight">Create Your Account</h2>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="flex justify-center">
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-24">
                                    {!imagePreview ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-8 h-8 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg> : <Image height={100} width={100} src={imagePreview.toString()} alt="Tailwind CSS Navbar component" />}
                                </div>
                            </div>
                        </div>

                        <label className="form-control w-full max-w-xs">
                            <div className={`input input-bordered flex ${errors.name ? 'input-error' : ''} items-center gap-2`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                <input type="text" placeholder="Name" className="grow" {...register('name')} />
                            </div>
                            {errors.name && <div className="label">
                                <span className="label-text-alt text-error">{errors.name?.message}</span>
                            </div>}
                        </label>


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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input type="password" placeholder="Password" className="grow" {...register('password')} />
                            </div>
                            {errors.password && <div className="label">
                                <span className="label-text-alt text-error">{errors.password?.message}</span>
                            </div>}
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className={`input input-bordered flex ${errors.confirmPassword ? 'input-error' : ''} items-center gap-2`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input type="password" placeholder="Confirm Password" className="grow" {...register('confirmPassword')} />
                            </div>
                            {errors.confirmPassword && <div className="label">
                                <span className="label-text-alt text-error">{errors.confirmPassword?.message}</span>
                            </div>}
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Upload Your Picture</span>
                            </div>
                            <input type="file" className="file-input file-input-bordered w-full max-w-xs" {...register('profilePic', {
                                onChange: (e) => handleProfilePic(e)

                            })} />
                            {errors.profilePic && <div className="label">
                                <span className="label-text-alt text-error">{errors.profilePic?.message}</span>
                            </div>}
                        </label>

                        <div className="card-actions">
                            <button type="submit" className="btn btn-primary w-full">Register</button>
                        </div>
                    </form>

                </div>
            </div>
        </main>
    )
}
