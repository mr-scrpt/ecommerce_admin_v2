import { z } from "zod";
import { addressCreateSchema } from "./schema";

export const createInputSchema = z.object({
  addressData: addressCreateSchema,
});
