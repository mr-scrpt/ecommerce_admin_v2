import { propertyFormDefaultSchema } from "@/entities/property";
import { propertyItemFormSchema } from "@/entities/property/_domain/propertyItem/form.schema";
import { z } from "zod";

export const propertyUpdateFormSchema = propertyFormDefaultSchema
  .extend(propertyItemFormSchema.shape)
  .omit({ propertyList: true });

export type PropertyUpdateFormValues = z.infer<typeof propertyUpdateFormSchema>;
