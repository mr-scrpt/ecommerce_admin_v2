import { propertyBaseSchema } from "@/kernel/domain/property/property.schema";
import { propertyItemBaseSchema } from "@/kernel/domain/property/propertyItem.schema";
import { z } from "zod";

export const propertyCreateSchema = propertyBaseSchema;

export const propertyItemCreateSchema = propertyItemBaseSchema
  .pick({ name: true, value: true })
  .extend({
    id: z.string().optional(),
  });
