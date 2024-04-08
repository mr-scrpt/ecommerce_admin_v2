import {
  profileFormDefaultSchema,
  profileSchema,
} from "@/entities/user/profile";
import { z } from "zod";

export const profileUpdateSchema = z.object({
  ...profileSchema.shape,
  name: z.string(),
});

export const profileFormUpdateSchema = z.object({
  ...profileFormDefaultSchema.shape,
});

export type ProfileFromUpdateValues = z.infer<typeof profileFormUpdateSchema>;
