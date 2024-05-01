import { z } from "zod";

export const storeBaseSchema = z.object({
  name: z.string(),
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

// NOTE: With...
export const storeWithSettlementNameSchema = z.object({
  id: z.string(),
  ...storeBaseSchema.shape,
  settlementName: z.string(),
  createdAt: z.date(),
});
