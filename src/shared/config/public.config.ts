import { z } from "zod";

const configPublicSchema = z.object({
  isDev: z.boolean(),
  PUBLIC_URL: z.string(),
  COOKIE_NETWORK_NAME: z.string(),
  COOKIE_NETWORK_MAX_AGE: z.number(),
});

export const configPublic = configPublicSchema.parse({
  isDev: process.env.NODE_ENV === "development",
  PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  COOKIE_NETWORK_NAME: process.env.NEXT_PUBLIC_COOKIE_NETWORK_NAME,
  COOKIE_NETWORK_MAX_AGE: Number(
    process.env.NEXT_PUBLIC_COOKIE_NETWORK_MAX_AGE,
  ),
});
