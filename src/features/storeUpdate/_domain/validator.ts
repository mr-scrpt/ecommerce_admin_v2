import { z } from "zod";
import {
  storeSelectorSchema,
  storeUpdateSchema,
  storeUpdateSettlementSchema,
} from "./schema";

export const updateInputSchema = z.object({
  selector: storeSelectorSchema,
  storeData: storeUpdateSchema.partial(),
  settlementData: storeUpdateSettlementSchema,
});
