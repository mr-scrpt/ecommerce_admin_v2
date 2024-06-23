import { propertyBaseSchema } from "@/kernel/domain/property/property.schema";
import { propertyItemBaseSchema } from "@/kernel/domain/property/propertyItem.schema";

export const propertyCreateSchema = propertyBaseSchema;
export const propertyItemCreateSchema = propertyItemBaseSchema;
// export const propertyItemCreateSchema = propertyItemBaseSchema.omit({
//   createdAt: true,
// });

// export const propertyPropertyItemSchema = z.object({
//   propertyItemId: z.string(),
// });

// export const propertyCategorySchema = z.object({
//   categoryId: z.string(),
// });
