import { userSchema } from "@/entities/user/user.server";
import { z } from "zod";

export const userRegistrationSchema = z.object({
  ...userSchema.omit({ id: true }).shape,
});
