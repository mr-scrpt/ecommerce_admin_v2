import { z } from "zod";
import {
  propertyUpdateSchema,
  propertySelectorSchema,
  propertyItemUpdateSchema,
} from "./schema";

export const updateInputSchema = z.object({
  selector: propertySelectorSchema,
  propertyData: propertyUpdateSchema.partial(),
  propertyItemListData: z.array(propertyItemUpdateSchema.partial()),
});
