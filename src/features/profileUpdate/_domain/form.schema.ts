import { profileFormDefaultSchema } from "@/entities/profile";
import { z } from "zod";

export const profileFormUpdateSchema = z.object({
  ...profileFormDefaultSchema.shape,
});

export type ProfileFromUpdateValues = z.infer<typeof profileFormUpdateSchema>;
