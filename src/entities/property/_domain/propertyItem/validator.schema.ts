import { z } from "zod";
import { propertyItemSchema } from "@/kernel/domain/property/propertyItem.schema";

export const getByPropertyInputSchema = z.object({
  propertyId: z.string(),
});

export const getListOutputSchema = z.array(propertyItemSchema);
