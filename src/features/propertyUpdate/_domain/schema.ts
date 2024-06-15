import { propertyBaseSchema } from "@/entities/property/server";
import { z } from "zod";

export const propertySelectorSchema = z.object({
  id: z.string(),
});

export const propertyUpdateSchema = propertyBaseSchema.omit({
  createdAt: true,
});

// export const propertyItemUpdateSchema = propertyItemBaseSchema
//   .omit({
//     createdAt: true,
//   })
//   .extend({
//     id: z.string().optional(),
//   });
