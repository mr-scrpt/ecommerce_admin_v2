// import { storeBaseSchema } from "@/entities/store/server";
import { z } from "zod";

export const storeUpdateSchema = z.object({
  id: z.string(),
  ...storeBaseSchema.shape,
});
