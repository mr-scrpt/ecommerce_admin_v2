import { z } from "zod";
import { categoryCreateSchema } from "./schema";

export const createInputSchema = z.object({
  cartRowData: categoryCreateSchema,
});
