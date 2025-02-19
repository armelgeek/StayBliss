import { z } from "zod";

export const reservationSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(3, { message: "Fullname must contains at least 3 characters" })
    .max(64, { message: "Fullname cannot exceed 64 characters" }),
  nationality: z.string({ message: "Nationality is required" }),
  phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Invalid phone number."),
  email: z.string().email("invalid email format."),
  nationalID: z.string().regex(/^[a-zA-Z0-9]{6,12}$/, "Invalid national ID format"),
  message: z.string().max(255, { message: "Message cannot exceed 255 characters" }).optional(),
});