import { z } from "zod";
import { propertyUpdateSchema, propertySelectorSchema } from "./schema";
import { propertyItemUpdateSchema } from "@/entities/property/server";

export const updateInputSchema = z.object({
  selector: propertySelectorSchema,
  propertyData: propertyUpdateSchema.partial(),
  propertyItemListData: z.array(propertyItemUpdateSchema.partial()),
});
