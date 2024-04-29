import { z } from "zod";

export const storeBaseSchema = z.object({
  settlement: z.string(),
  address: z.string(),
});

export const storeSchema = z.object({
  id: z.string(),
  ...storeBaseSchema.shape,
  createdAt: z.date(),
});

export const storeRelationSchema = z.object({
  id: z.string(),
  ...storeBaseSchema.shape,
  settlementName: z.string(),
  createdAt: z.date(),
});
