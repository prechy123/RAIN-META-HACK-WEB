import { z } from "zod";
import { DAYS } from "@/components/onboarding/types";

const phoneRegex = /^[\d\s\-+()]+$/;
const websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;

/** Create Account page (email + password + confirm). */
export const createAccountSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/** Standalone email check (used when editing the account email on Review). */
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

/** Step 1 — Basic Business info. */
export const basicInfoSchema = z.object({
  businessName: z.string().trim().min(1, "Business name is required"),
  businessDescription: z
    .string()
    .trim()
    .min(1, "Business description is required"),
  businessCategory: z.string().trim().optional(),
  extra_information: z.string().trim().optional(),
});

/** Step 2 — Contact details. */
export const contactSchema = z.object({
  businessAddress: z
    .string()
    .trim()
    .min(1, "Business address or Yardcode is required"),
  businessPhone: z
    .string()
    .trim()
    .min(1, "Business phone number is required")
    .regex(phoneRegex, "Please enter a valid phone number"),
  businessEmailAddress: z
    .string()
    .min(1, "Business email is required")
    .email("Please enter a valid business email address"),
  businessWebsite: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => !v || websiteRegex.test(v),
      "Please enter a valid website URL",
    ),
});

/** Step 3 — Business hours (validates the structured editor state). */
const dayHoursSchema = z.object({
  open: z.boolean(),
  from: z.string().min(1),
  to: z.string().min(1),
});

export const hoursSchema = z
  .record(z.string(), dayHoursSchema)
  .refine((h) => DAYS.some((d) => h[d]?.open), "Select at least one open day");

/** Step 4 — FAQ (optional; any entry must be complete). */
export const faqStepSchema = z.object({
  faqs: z.array(
    z.object({
      question: z.string().trim().min(1, "Each FAQ needs a question"),
      answer: z.string().trim().min(1, "Each FAQ needs an answer"),
    }),
  ),
});

/** Step 5 — Products/Services (optional; any entry must be complete). */
export const productsStepSchema = z.object({
  items: z.array(
    z.object({
      name: z.string().trim().min(1, "Each product needs a name"),
      price: z.number().positive("Each product needs a price greater than 0"),
      description: z.string().optional(),
    }),
  ),
});

/** Draft validators for the add-one-at-a-time FAQ / Products inputs. */
export const faqDraftSchema = z.object({
  question: z.string().trim().min(1, "Question is required"),
  answer: z.string().trim().min(1, "Answer is required"),
});

export const productDraftSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .refine((v) => parseFloat(v) > 0, "Price must be greater than 0"),
  description: z.string().optional(),
});

/** Step 6 — full payload re-check before submitting. */
export const businessSchema = basicInfoSchema
  .merge(contactSchema)
  .merge(faqStepSchema)
  .merge(productsStepSchema)
  .extend({
    businessOpenDays: z.string().min(1, "Select at least one open day"),
  });

/** Returns the first validation message from a failed safeParse result. */
export function firstIssue(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Please check your input";
}

/** Maps a ZodError to a { fieldName: message } record keyed by the top-level path. */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.length ? String(issue.path[0]) : "_root";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
