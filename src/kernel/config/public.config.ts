import { z } from "zod";

const configPublicSchema = z.object({
  isDev: z.boolean(),
  PUBLIC_URL: z.string(),
});

console.log("output_log:  =>>>", process.env);

export const configPublic = configPublicSchema.parse({
  isDev: process.env.NODE_ENV === "development",
  PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
});
