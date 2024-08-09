import { consumerFormDefaultSchema } from "@/entities/consumer";
import { z } from "zod";

// export const consumerUpdateFormSchema = z.object({
//   ...consumerFormDefaultSchema
// });
//
export const consumerUpdateFormSchema = consumerFormDefaultSchema;

export type ConsumerUpdateFormValues = z.infer<typeof consumerUpdateFormSchema>;
