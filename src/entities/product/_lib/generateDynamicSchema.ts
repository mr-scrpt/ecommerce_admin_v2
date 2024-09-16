import { ProductPropertyToSelect } from "../_domain/product.types";
import { z } from "zod";
import { productFormDefaultSchema } from "../_domain/form.schema";
import { PROPERTY_DATATYPE } from "@prisma/client";

// const dynamicOptionSchema: Record<string, z.ZodType<any, any>> = {};

const typeToSchemaMap: Record<PROPERTY_DATATYPE, z.ZodType<any, any>> = {
  [PROPERTY_DATATYPE.MULT]: z.array(z.string()),
  [PROPERTY_DATATYPE.CHECKBOX]: z.array(z.string()),
  [PROPERTY_DATATYPE.SELECT]: z.string(),
  [PROPERTY_DATATYPE.RADIO]: z.string(),
};

export const generateDynamicSchema = (
  propertySelectOptionList: ProductPropertyToSelect[],
) => {
  const dynamicOptionSchema: Record<string, z.ZodType<any, any>> = {};
  for (const option of propertySelectOptionList) {
    const schema = typeToSchemaMap[option.datatype];
    dynamicOptionSchema[option.name] = schema || z.string();
  }
  return dynamicOptionSchema;
};

export const generateProductFormSchema = (
  propertySelectOptionList: ProductPropertyToSelect[],
) => {
  const dynamicOptionSchema = generateDynamicSchema(propertySelectOptionList);

  return productFormDefaultSchema.extend({
    propertyList: z.object(dynamicOptionSchema),
  });
};
