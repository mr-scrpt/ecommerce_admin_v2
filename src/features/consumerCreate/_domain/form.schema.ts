import { consumerFormDefaultSchema } from "@/entities/consumer";
import { z } from "zod";

export const consumerCreateFormSchema = consumerFormDefaultSchema;

export type ConsumerCreateFormValues = z.infer<typeof consumerCreateFormSchema>;
