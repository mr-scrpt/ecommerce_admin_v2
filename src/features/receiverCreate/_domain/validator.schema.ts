import { z } from "zod";
import { receiverCreateSchema } from "./schema";

export const createInputSchema = z.object({
  receiverData: receiverCreateSchema,
});
