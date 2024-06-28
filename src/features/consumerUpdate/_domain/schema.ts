import { consumerBaseSchema } from "@/kernel/domain/consumer/consumer.schema";
import { z } from "zod";

export const consumerUpdateSchema = consumerBaseSchema.pick({
  name: true,
  email: true,
  phone: true,
  image: true,
});

export const consumerSelectorSchema = z.object({
  id: z.string(),
});
