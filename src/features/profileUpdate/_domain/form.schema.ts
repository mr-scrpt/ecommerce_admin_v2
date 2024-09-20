import { profileFormDefaultSchema } from "@/entities/profile";
import { z } from "zod";

export const profileFormUpdateSchema = z
  .object({
    ...profileFormDefaultSchema.shape,
  })
  .omit({
    profile: true,
  });

export type ProfileFromUpdateValues = z.infer<typeof profileFormUpdateSchema>;
