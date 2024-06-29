import { storeBaseSchema } from "@/kernel/domain/store/store.schema";
import { z } from "zod";

export const storeUpdateSchema = z.object({
  id: z.string(),
  ...storeBaseSchema.shape,
});
