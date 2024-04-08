import { userFormDefaultSchema, userSchema } from "@/entities/user/user";
import { z } from "zod";

export const userUpdateSchema = z.object({
  ...userSchema.shape,
  name: z.string(),
});

export const userUpdateFormSchema = z.object({
  ...userFormDefaultSchema.shape,
});

export type UserUpdateFormValues = z.infer<typeof userUpdateFormSchema>;
