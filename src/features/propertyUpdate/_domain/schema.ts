import { propertyBaseSchema } from "@/kernel/domain/property/property.schema";
import { propertyItemBaseSchema } from "@/kernel/domain/property/propertyItem.schema";
import { z } from "zod";

export const propertySelectorSchema = z.object({
  id: z.string(),
});

export const propertyUpdateSchema = propertyBaseSchema;

export const propertyItemUpdateSchema = propertyItemBaseSchema
  .pick({
    name: true,
    value: true,
  })
  .extend({
    id: z.string().optional(),
  });
