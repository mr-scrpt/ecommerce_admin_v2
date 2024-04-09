import { userSchema } from "@/entities/user/user.server";
import { z } from "zod";

export const userUpdateSchema = z.object({
  ...userSchema.shape,
  name: z.string(),
});
