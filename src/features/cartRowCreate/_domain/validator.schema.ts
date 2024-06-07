import { z } from "zod";
import { cartRowCreateSchema } from "./schema";

export const createInputSchema = z.object({
  cartRowData: cartRowCreateSchema,
});
