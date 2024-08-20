import { propertyFormDefaultSchema } from "@/entities/property";
import { propertyItemFormSchema } from "@/entities/property/_domain/propertyItem/form.schema";
import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

// export const propertyCreateFormSchema = propertyFormDefaultSchema
//   .extend({
//     propertyItemList: z.array(selectItemSchema(z.string())),
//   })
//   .omit({
//     propertyList: true,
//   });

export const propertyCreateFormSchema = propertyFormDefaultSchema
  .extend(propertyItemFormSchema.shape)
  .omit({
    propertyList: true,
  });

export type PropertyCreateFormValues = z.infer<typeof propertyCreateFormSchema>;
