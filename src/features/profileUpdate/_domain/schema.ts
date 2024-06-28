import { profileBaseSchema } from "@/kernel/domain/profile/profile.schema";
import { z } from "zod";

export const profileUpdateSchema = profileBaseSchema.pick({
  name: true,
  email: true,
  phone: true,
  image: true,
});

export const profileSelectorSchema = z.object({
  id: z.string(),
});
