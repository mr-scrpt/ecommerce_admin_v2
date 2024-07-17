import { z } from "zod";
import { RoleEnum } from "../role.type";

// NOTE: Base
export const staffBaseSchema = z.object({
  email: z.string(),
  lastName: z.string(),
  phone: z.string(),
  name: z.string(),
  image: z.string().nullable().optional(),
  role: z.custom<RoleEnum>(),
});

// NOTE: Projections
export const staffSchema = z.object({
  id: z.string(),
  ...staffBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
