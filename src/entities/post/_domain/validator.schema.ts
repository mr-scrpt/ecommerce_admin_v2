import { postOfficeSchema } from "@/kernel/domain/post/post.schema";
import { settlementSchema } from "@/kernel/domain/settlement/settlement.schema";
import { z } from "zod";

export const getBySettlementInputSchema = z.object({
  settlementId: settlementSchema.shape.id,
});

export const getListOutputSchema = z.array(postOfficeSchema);
