import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  email: z.string(),
  role: z.string(),
  emailVerified: z.date().nullable(),
  createdAt: z.date(),

  image: z.string().nullable().optional(),
});
