import { orderRowSchema } from "@/kernel/domain/order/orderRow.schema";
import { z } from "zod";
import { orderRowRelationSchema } from "./orderRow.schema";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getByOrderInputSchema = z.object({
  orderId: z.string(),
});

export const getListOutputSchema = z.array(orderRowSchema);
export const getListRelationOutputSchema = z.array(orderRowRelationSchema);
