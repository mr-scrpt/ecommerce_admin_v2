import { PropertyDataTypeEnum } from "@/kernel/domain/property/property.type";
import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

export const propertyFormDefaultSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  datatype: z.array(selectItemSchema(z.nativeEnum(PropertyDataTypeEnum))),
  propertyList: z.array(selectItemSchema(z.string())).optional(),
});

export type PropertyFormDefaultValues<
  T extends z.ZodTypeAny = typeof propertyFormDefaultSchema,
> = z.infer<T>;
