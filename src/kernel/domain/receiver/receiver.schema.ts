import { z } from "zod";

// NOTE: Base
export const receiverBaseSchema = z.object({
  userId: z.string(),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
});

// NOTE: Projections
export const receiverSchema = z.object({
  id: z.string(),
  ...receiverBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
