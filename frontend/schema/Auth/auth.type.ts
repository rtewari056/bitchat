import { TypeOf } from "zod";

// Zod schema
import { loginSchema, registerSchema } from "./auth.schema";

export type LoginForm = TypeOf<typeof loginSchema>;
export type RegisterForm = TypeOf<typeof registerSchema>;