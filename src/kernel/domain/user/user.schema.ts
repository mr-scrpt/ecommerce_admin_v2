import { z } from "zod";
import { RoleEnum } from "../role.type";

// NOTE: Base
export const userBaseSchema = z.object({
  name: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string(),
  phone: z.string(),
  role: z.custom<RoleEnum>(),
  emailVerified: z.date().nullable(),
  image: z.string().optional().nullable(),
});

// NOTE: Projections
export const userSchema = z.object({
  id: z.string(),
  ...userBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userStrictSchema = z
  .object({
    id: z.string(),
    ...userBaseSchema.shape,
  })
  .extend({ name: z.string() });
