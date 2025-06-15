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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];

const fileSchema = z
  .instanceof(FileList)
  .refine((files) => files?.length > 0, 'File is required.')
  .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
    'Only .jpg, .jpeg, .png, .webp, and .pdf files are accepted.'
  );

// Create Business Schema
export const CreateBusinessSchema = z.object({
  name: z.string().min(3, { message: "Business name must be at least 3 characters." }),
  industry: z.string().min(1, { message: "Industry is required." }),
  stage: z.string().min(1, { message: "Business stage is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  funding_goal: z.coerce.number().positive({ message: "Funding goal must be a positive number." }),
  monthly_revenue: z.coerce.number().min(0, { message: "Monthly revenue cannot be negative." }).optional(),
  monthly_expenses: z.coerce.number().min(0, { message: "Monthly expenses cannot be negative." }).optional(),
  employees: z.string().optional(),
  use_of_funds: z.string().optional(),
  governmentId: fileSchema,
  businessRegistration: fileSchema,
  proofOfAddress: fileSchema.optional(),
  bankStatement: fileSchema.optional(),
});
