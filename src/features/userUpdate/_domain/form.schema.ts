import { userFormDefaultSchema } from "@/entities/user";
import { z } from "zod";

export const userUpdateFormSchema = z.object({
  ...userFormDefaultSchema.shape,
});

export type UserUpdateFormValues = z.infer<typeof userUpdateFormSchema>;
