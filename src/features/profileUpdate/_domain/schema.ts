import { profileSchema } from "@/entities/user/profile";
import { z } from "zod";

export const profileUpdateSchema = z.object({
  ...profileSchema.shape,
  name: z.string(),
});
