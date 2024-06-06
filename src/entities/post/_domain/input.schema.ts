import { z } from "zod";
import { postOfficeSchema } from "./post.schema";

export const getBySettlementInputSchema = z.object({
  settlementId: z.string(),
});

export const getListOutputSchema = z.array(postOfficeSchema);
