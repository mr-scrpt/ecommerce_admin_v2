import { deliverySchema } from "@/entities/delivery/server";
import { z } from "zod";

export const deliverySelectorSchema = z.object({
  id: z.string(),
});

export const deliveryUpdateSchema = deliverySchema.omit({ id: true });
