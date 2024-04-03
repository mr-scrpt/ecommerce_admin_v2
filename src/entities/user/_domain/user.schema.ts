import { Role } from "@/shared/lib/user";
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

export const userRelationOrderSchema = z.object({
  id: z.string(),
  orderNo: z.number(),
  userId: z.string(),
  createdAt: z.date(),
  orderStatus: z.string(),
  paymentStatus: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  email: z.string(),
  phone: z.string(),
  role: z.custom<Role>(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable().optional(),
  createdAt: z.date(),
});

export const userUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.custom<Role>(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable().optional(),
  createdAt: z.date(),
});

export const userCreateSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.custom<Role>(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable().optional(),
  createdAt: z.date(),
});

export const userWithCartSchema = z.object({
  ...userSchema.shape,

  cart: userRelationCartSchema,
});

export const userWithOrderListSchema = z.object({
  ...userSchema.shape,

  orderList: z.array(userRelationOrderSchema),
});

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
