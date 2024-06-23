import { settlementSchema } from "@/kernel/domain/settlement/settlement.schema";
import { storeSchema } from "@/kernel/domain/store/store.schema";
import { z } from "zod";

export const storeRelationSchema = z.object({
  ...storeSchema.shape,
  settlement: settlementSchema,
});
