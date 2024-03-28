import { Role } from "@/shared/lib/user";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

// Relations Entity
export const userRelationCartSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.date(),

  cartRowList: z.array(
    z.object({
      id: z.string(),
      cartId: z.string(),
      productId: z.string(),
      quantity: z.number(),
      createdAt: z.date(),
    }),
  ),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  email: z.string(),
  phone: z.string().nullable().optional(),
  role: z.custom<Role>(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable().optional(),
  createdAt: z.date(),
});

export const userRelationSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  email: z.string(),
  phone: z.string().nullable().optional(),
  role: z.custom<Role>(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable().optional(),
  createdAt: z.date(),

  cart: userRelationCartSchema,
});

export const userFormSchema = z.object({
  // email: z.string().email().optional(),
  email: z.string().email(),
  phone: z
    .string()
    // .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .or(z.literal(""))
    .nullable()
    .optional(),
  name: z
    .string()
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim())
    .optional(),
  image: z.string().optional(),
  emailVerified: z.date().nullable().optional(),
  // role: z.string(),
  role: z.custom<Role>(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
