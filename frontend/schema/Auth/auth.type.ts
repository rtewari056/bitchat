import { TypeOf } from "zod";

// Zod schema
import { loginSchema } from "./auth.schema";

export type LoginForm = TypeOf<typeof loginSchema>;