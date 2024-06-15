import { z } from "zod";
import { propertyCreateSchema } from "./schema";
import { propertyItemCreateSchema } from "@/entities/property/server";

export const createInputSchema = z.object({
  propertyData: propertyCreateSchema,
  propertyItemData: z.array(propertyItemCreateSchema),
});
