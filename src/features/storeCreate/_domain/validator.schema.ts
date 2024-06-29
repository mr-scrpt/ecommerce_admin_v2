import { z } from "zod";
import { storeCreateSchema } from "./schema";

export const createInputSchema = z.object({
  storeData: storeCreateSchema,
});
