import { consumerSchema } from "@/kernel/domain/consumer/consumer.schema";
import { z } from "zod";

export const consumerSelectorSchema = z.object({
  id: z.string(),
});

export const consumerRemoveSchema = consumerSchema.pick({
  id: true,
  name: true,
  email: true,
  phone: true,
});
