import { userBaseSchema } from "@/kernel/domain/user/user.schema";
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
