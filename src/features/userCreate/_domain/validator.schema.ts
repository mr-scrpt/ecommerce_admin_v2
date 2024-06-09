import { z } from "zod";
import { userCreateSchema } from "./schema";

export const createInputSchema = z.object({
  userData: userCreateSchema,
});
