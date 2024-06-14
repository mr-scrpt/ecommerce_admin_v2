import { userBaseSchema } from "@/entities/user/user.server";
import { z } from "zod";

export const userRegistrationSchema = userBaseSchema.pick({
  name: true,
  email: true,
  phone: true,
});

export const userCreateSchema = userBaseSchema
  .pick({
    name: true,
    email: true,
    phone: true,
  })
  .extend({
    name: z.string(),
  });
