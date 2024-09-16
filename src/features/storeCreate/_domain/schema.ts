import { storeBaseSchema } from "@/kernel/domain/store/store.schema";
import { z } from "zod";

export const storeCreateSchema = storeBaseSchema;
export const storeCreateSettlementSchema = z.object({
  settlementRef: z.string(),
});
