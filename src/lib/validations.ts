
import * as z from 'zod';

// Password strength validation
export const passwordValidation = z.string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." });

// Login form schema
export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

// SignUp page schema
export const SignUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: passwordValidation,
  confirmPassword: z.string(),
  userType: z.enum(["investor", "entrepreneur"], { 
    errorMap: () => ({ message: "You must select a role." }),
  }),
  organizationType: z.string().optional(),
  investmentMotivation: z.string().optional(),
  industryPreferences: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  defaultContributionMode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

// SignUpForm component schema (used in modal)
export const SignUpFormSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: passwordValidation,
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
  organizationType: z.string().optional(),
  investmentMotivation: z.string().optional(),
  industryPreferences: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  defaultContributionMode: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});
