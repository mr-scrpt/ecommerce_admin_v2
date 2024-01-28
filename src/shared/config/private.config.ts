import { z } from "zod";

const configPrivateSchema = z.object({
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),
});

export const configPrivate = configPrivateSchema.parse(process.env);
