import { PropertyDataTypeEnum } from "@/kernel/domain/property/property.type";
// import { propertyItemUpdateSchema } from "@/kernel/domain/property/propertyItem.schema";
import { z } from "zod";
import { propertyItemFormSchema } from "../propertyItem/form.schema";

export const propertyFormSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  datatype: z.nativeEnum(PropertyDataTypeEnum),
  // propertyItemList: z.array(propertyItemUpdateSchema),
  propertyItemList: z.array(propertyItemFormSchema),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;
