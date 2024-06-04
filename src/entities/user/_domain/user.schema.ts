import { Role } from "@/kernel/domain/role.type";
import { z } from "zod";

// NOTE: Relations Schema
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

export const userRelationOrderSchema = z.object({
  id: z.string(),
  orderNo: z.number(),
  userId: z.string(),
  createdAt: z.date(),
  orderStatus: z.string(),
  paymentStatus: z.string(),
});

// NOTE: Base Schema
export const userBaseSchema = z.object({
  name: z.string().nullable(),
  email: z.string(),
  phone: z.string(),
  role: z.custom<Role>(),
  emailVerified: z.date().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.date(),
});

export const userSchema = z.object({
  id: z.string(),
  ...userBaseSchema.shape,
});

export const userStrictSchema = z.object({
  id: z.string(),
  ...userBaseSchema.shape,
  name: z.string(),
});

export const userWithCartSchema = z.object({
  ...userBaseSchema.shape,

  cart: userRelationCartSchema,
});

export const userWithOrderListSchema = z.object({
  ...userBaseSchema.shape,

  orderList: z.array(userRelationOrderSchema),
});

// NOTE: FORM
// NOTE: Main information

export const userFormDefaultSchema = z.object({
  email: z.string().email(),
  phone: z.string().or(z.literal("")),
  name: z
    .string()
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .min(3, {
      message: "Username must not be shorter than 3!! characters.",
    })
    .transform((name) => name.trim()),
  image: z.string().optional(),
  emailVerified: z.date().nullable().optional(),
  role: z.custom<Role>(),
});

export type UserFormDefaultValues = z.infer<typeof userFormDefaultSchema>;
