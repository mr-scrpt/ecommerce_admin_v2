import { propertyItemBaseSchema } from "@/entities/property/server";
import { propertyBaseSchema } from "@/entities/property/server";

export const propertyCreateSchema = propertyBaseSchema.omit({
  createdAt: true,
});

export const propertyItemCreateSchema = propertyItemBaseSchema.omit({
  createdAt: true,
});

// export const propertyPropertyItemSchema = z.object({
//   propertyItemId: z.string(),
// });

// export const propertyCategorySchema = z.object({
//   categoryId: z.string(),
// });
