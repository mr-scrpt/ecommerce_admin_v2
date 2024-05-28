import { profileSchema } from "@/entities/user/profile";

export const updateInputSchema = profileSchema.partial();
