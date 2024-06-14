import { z } from "zod";
import { propertyCreateSchema, propertyItemCreateSchema } from "./schema";

export const createInputSchema = z.object({
  propertyData: propertyCreateSchema,
  propertyItemData: z.array(propertyItemCreateSchema),
});
