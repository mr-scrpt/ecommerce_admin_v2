import { PropertyDataTypeEnum } from "@/kernel/domain/property/property.type";
import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

export const propertyFormSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  datatype: z.nativeEnum(PropertyDataTypeEnum),
  propertyList: z.array(selectItemSchema),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;
