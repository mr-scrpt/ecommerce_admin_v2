import { consumerFormDefaultSchema } from "@/entities/consumer";
import { z } from "zod";

export const consumerUpdateFormSchema = z.object({
  ...consumerFormDefaultSchema.shape,
});

export type ConsumerUpdateFormValues = z.infer<typeof consumerUpdateFormSchema>;
