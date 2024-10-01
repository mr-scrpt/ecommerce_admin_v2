import { consumerFormDefaultSchema } from "@/entities/consumer";
import { z } from "zod";

export const consumerCreateFormSchema = consumerFormDefaultSchema.omit({
  consumer: true,
});

export type ConsumerCreateFormValues = z.infer<typeof consumerCreateFormSchema>;
