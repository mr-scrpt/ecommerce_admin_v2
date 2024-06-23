import { z } from "zod";

// NOTE: Base
export const storeBaseSchema = z.object({
  name: z.string(),
  settlementRef: z.string(),
  address: z.string(),
});

// NOTE: Projetions
export const storeSchema = z.object({
  id: z.string(),
  ...storeBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
