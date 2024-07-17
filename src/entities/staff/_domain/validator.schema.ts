import { staffSchema } from "@/kernel/domain/staff/staff.schema";
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

export const getListOutputSchema = z.array(staffSchema);
export const searchOutputSchema = z.array(staffSchema);
