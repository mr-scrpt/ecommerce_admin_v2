import { z } from "zod";

export const orderSelectorSchema = z.object({
  id: z.string(),
});

export const orderReceiverBindSchema = z.object({
  receiverId: z.string(),
});
