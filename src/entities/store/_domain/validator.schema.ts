import { z } from "zod";
import { storeRelationSchema } from "./store.schema";
import { storeSchema } from "@/kernel/domain/store/store.schema";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getBySettlementRefInputSchema = z.object({
  settlementRef: z.string().optional(),
});

export const getListOutputSchema = z.array(storeSchema);
export const getListWithRelationOutputSchema = z.array(storeRelationSchema);
