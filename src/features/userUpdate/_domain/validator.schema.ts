import { z } from "zod";
import { userSelectorSchema, userUpdateSchema } from "./schema";

export const updateInputSchema = z.object({
  selector: userSelectorSchema,
  userData: userUpdateSchema,
});
