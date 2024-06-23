import { PropertyDataTypeEnum } from "@/kernel/domain/property/property.type";
import { z } from "zod";
import { propertyItemUpdateSchema } from "../propertyItem/propertyItem.schema";

export const propertyFormSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  datatype: z.nativeEnum(PropertyDataTypeEnum),
  propertyItemList: z.array(propertyItemUpdateSchema),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;
