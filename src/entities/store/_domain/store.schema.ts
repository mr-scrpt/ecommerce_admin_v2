import { z } from "zod";

export const storeBaseSchema = z.object({
  name: z.string(),
  settlement: z.string(),
  address: z.string(),
  createdAt: z.date(),
});

export const storeSchema = z.object({
  id: z.string(),
  ...storeBaseSchema.shape,
});

export const storeRelationSchema = z.object({
  id: z.string(),
  ...storeBaseSchema.shape,
  settlementName: z.string(),
});

// NOTE: With...
export const storeWithSettlementNameSchema = z.object({
  id: z.string(),
  ...storeBaseSchema.shape,
  settlementName: z.string(),
});
