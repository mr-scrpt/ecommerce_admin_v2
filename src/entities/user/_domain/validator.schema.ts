import { userSchema } from "@/kernel/domain/user/user.schema";
import { z } from "zod";

export const getInputSchema = z.object({
  id: z.string(),
});

export const searchInputSchema = z.object({
  q: z.string(),
});

export const getListOutputSchema = z.array(userSchema);
export const searchOutputSchema = z.array(userSchema);
