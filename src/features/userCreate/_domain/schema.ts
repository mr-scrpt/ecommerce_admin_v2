import { z } from "zod";

export const userRegistrationSchema = z.object({
  name: z.string().nullable(),
  email: z.string(),
  phone: z.string(),
});

export const userCreateSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});
