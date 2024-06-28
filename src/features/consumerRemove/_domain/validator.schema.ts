import { z } from "zod";
import { consumerSelectorSchema } from "./schema";

export const removeInputSchema = z.object({
  selector: consumerSelectorSchema,
});
