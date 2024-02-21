import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    verification_code: { type: String, required: true, select: false },
    salt: { type: String, required: true, select: false }, // By default don't fetch this field
    password: { type: String, required: true, select: false }, // By default don't fetch this field
    password_reset_code: { type: String, required: false, select: false, default: null }, // By default don't fetch this field
    profile_pic: { type: String, required: true },
    is_verified: { type: Boolean, required: false, default: false }
}, { timestamps: true });

type UserDocument = InferSchemaType<typeof userSchema>; // Create model type using provided schema

export default model<UserDocument>('User', userSchema);