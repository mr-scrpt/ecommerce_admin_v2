import { z } from "zod";
import { Role } from "../role.type";

// NOTE: Base
export const userBaseSchema = z.object({
  name: z.string().nullable(),
  email: z.string(),
  phone: z.string(),
  role: z.custom<Role>(),
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
