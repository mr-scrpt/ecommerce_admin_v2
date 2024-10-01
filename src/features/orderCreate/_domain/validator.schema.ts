import { z } from "zod";
import { orderEmptyCreateSchema } from "./schema";

export const createEmptyInputSchema = z.object({
  orderData: orderEmptyCreateSchema,
});
