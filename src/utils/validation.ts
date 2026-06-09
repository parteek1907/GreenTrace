import { z } from "zod";

// Generic schemas for reuse
export const emailSchema = z.string().email({ message: "Invalid email address" });
export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" });

// API Route Validation
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "Password is required" }),
});

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50),
});

// Profile Update Validation
export const profileSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  country: z.string().length(2).optional(),
  currency: z.string().length(3).optional(),
});
