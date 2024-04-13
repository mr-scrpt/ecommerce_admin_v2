import { userFormDefaultSchema } from "@/entities/user/user";
import { z } from "zod";

export const userCreateFormSchema = z.object({
  ...userFormDefaultSchema.shape,
});

export type UserCreateFormValues = z.infer<typeof userCreateFormSchema>;
