import { OptionSelect } from "@/entities/option";
import * as z from "zod";

// Определяем тип для объекта схемы Zod
type ZodRawShape = { [k: string]: z.ZodType<any, any> };

// Тип для объекта схемы Zod или объекта схожей формы
type SchemaObject<T extends ZodRawShape> = z.ZodObject<
  T,
  "strip",
  z.ZodTypeAny,
  unknown,
  unknown
>;

// Функция для преобразования объекта в объект схемы Zod
const toZodSchema = <T extends Record<string, z.ZodType<any, any>>>(
  obj: T,
): SchemaObject<T> => {
  return z.object(obj) as SchemaObject<T>;
};

// Функция для генерации динамической формы
export const generateFormSchemaDynamic = <T extends ZodRawShape>(
  schemaBase: SchemaObject<T>,
  options: OptionSelect[],
) => {
  const dynamicFields: Record<string, any> = {};

  options.forEach((option) => {
    const optionSchema = z.object({});
    option.optionList.forEach((item) => {
      optionSchema.merge(z.object({ [item.label]: z.boolean() }));
    });
    dynamicFields[option.name] = optionSchema;
  });

  return schemaBase.extend(dynamicFields);
};
