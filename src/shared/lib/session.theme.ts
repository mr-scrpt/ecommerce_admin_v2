import { z } from "zod";
import { Role } from "./user";

export const SessionSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string(),
    role: z.custom<Role>(),
    cartId: z.string(),
    name: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
  }),
  expires: z.string(),
});

export type SessionEntity = z.infer<typeof SessionSchema>;
