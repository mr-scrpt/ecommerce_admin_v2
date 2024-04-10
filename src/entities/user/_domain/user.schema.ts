import { Role } from "@/shared/lib/user";
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
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.custom<Role>(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  createdAt: z.date(),
});

export const userSchema = z.object({
  id: z.string(),
  ...userBaseSchema.shape,
});

export const userDammySchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  phone: z.string().nullable(),
  role: z.custom<Role>(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  createdAt: z.date(),
});

export const userFiledSchema = z.object({
  id: z.string(),
  ...userBaseSchema.shape,
  name: z.string(),
});

// export const userWithCartSchema = z.object({
//   ...userBaseSchema.shape,
//
//   cart: userRelationCartSchema,
// });
//
// export const userWithOrderListSchema = z.object({
//   ...userBaseSchema.shape,
//
//   orderList: z.array(userRelationOrderSchema),
// });
