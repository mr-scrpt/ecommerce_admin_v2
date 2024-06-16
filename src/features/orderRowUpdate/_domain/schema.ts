import { orderRowBaseSchema } from "@/entities/order/server";
import { z } from "zod";

export const orderRowSelectorSchema = z.object({
  id: z.string(),
});

export const orderRowUpdateSchema = orderRowBaseSchema.pick({
  quantity: true,
});
