import { z } from "zod";
import { consumerSelectorSchema, consumerUpdateSchema } from "./schema";

export const updateInputSchema = z.object({
  selector: consumerSelectorSchema,
  consumerData: consumerUpdateSchema,
});
