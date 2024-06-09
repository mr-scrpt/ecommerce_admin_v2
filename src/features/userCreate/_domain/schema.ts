import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string().nullable(),
  email: z.string(),
  phone: z.string(),
});
