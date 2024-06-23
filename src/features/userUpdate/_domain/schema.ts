import { userBaseSchema } from "@/entities/user/user.server";
import { z } from "zod";

export const userUpdateSchema = userBaseSchema.pick({
  name: true,
  email: true,
  phone: true,
  image: true,
});

export const userSelectorSchema = z.object({
  id: z.string(),
});
