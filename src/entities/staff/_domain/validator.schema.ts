import { consumerSchema } from "@/kernel/domain/consumer/consumer.schema";
import { z } from "zod";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getByOrderInputSchema = z.object({
  orderId: z.string(),
});

export const searchInputSchema = z.object({
  q: z.string(),
});

export const getListOutputSchema = z.array(consumerSchema);
export const searchOutputSchema = z.array(consumerSchema);
