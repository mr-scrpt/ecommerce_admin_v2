import { receiverSchema } from "@/kernel/domain/receiver/receiver.schema";
import { z } from "zod";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getByUserInputSchema = z.object({
  userId: z.string(),
});

export const getListOutputSchema = z.array(receiverSchema);
