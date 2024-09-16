import { z } from "zod";
import { storeCreateSchema, storeCreateSettlementSchema } from "./schema";

export const createInputSchema = z.object({
  storeData: storeCreateSchema,
  settlementData: storeCreateSettlementSchema,
});
