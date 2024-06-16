import { z } from "zod";
import { orderRowSelectorSchema } from "./schema";

export const removeInputSchema = z.object({
  selector: orderRowSelectorSchema,
});
