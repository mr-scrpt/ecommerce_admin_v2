import { consumerDefaultSelectOptionSchema } from "@/kernel/domain/consumer/form.schema";
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

  consumer: consumerDefaultSelectOptionSchema.optional().nullable(),
});

export type ConsumerFormDefaultValues = z.infer<
  typeof consumerFormDefaultSchema
>;

export const defaultFieldsValues: ConsumerFormDefaultValues = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  consumer: null,
};
