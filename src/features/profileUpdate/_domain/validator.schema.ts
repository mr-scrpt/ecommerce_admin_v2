import { z } from "zod";
import { profileSelectorSchema, profileUpdateSchema } from "./schema";

export const updateInputSchema = z.object({
  selector: profileSelectorSchema,
  profileData: profileUpdateSchema.partial(),
});
