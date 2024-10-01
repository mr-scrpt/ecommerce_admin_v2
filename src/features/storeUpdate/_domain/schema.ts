import { storeBaseSchema } from "@/kernel/domain/store/store.schema";
import { z } from "zod";

export const storeSelectorSchema = z.object({
  id: z.string(),
});

export const storeUpdateSettlementSchema = z.object({
  settlementRef: z.string(),
});

export const storeUpdateSchema = storeBaseSchema;
