import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const consumerFormDefaultSchema = z.object({
  name: z
    .string()
    .transform((name) => name.trim())
    .pipe(z.string().max(30).min(2)),
  lastName: z
    .string()
    .transform((name) => name.trim())
    .pipe(z.string().max(30).min(2)),

  email: z.string().email(),
  phone: z
    .string()
    .transform((name) => name.trim())
    .pipe(z.string().max(18).min(9)),
  consumerList: z.array(z.string()).optional(),
});

export type ConsumerFormDefaultValues = z.infer<
  typeof consumerFormDefaultSchema
>;

// NOTE: Select
export const consumerSelectFromSchema = z.object({
  id: z.string(),
});

export type ConsumerSelectFormValues = z.infer<typeof consumerSelectFromSchema>;
