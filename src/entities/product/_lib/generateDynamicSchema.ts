import { PropertyDataTypeEnum } from "@/shared/type/propertyDataType.enum";
import { ProductPropertyToSelect } from "../_domain/types";
import { z } from "zod";

const dynamicOptionSchema: Record<string, z.ZodType<any, any>> = {};

const typeToSchemaMap: Record<PropertyDataTypeEnum, z.ZodType<any, any>> = {
  [PropertyDataTypeEnum.MULT]: z.array(z.string()),
  [PropertyDataTypeEnum.CHECKBOX]: z.array(z.string()),
  [PropertyDataTypeEnum.SELECT]: z.string(),
  [PropertyDataTypeEnum.RADIO]: z.string(),
};

export const generateDynamicSchema = (
  propertySelectOptionList: ProductPropertyToSelect[],
) => {
  for (const option of propertySelectOptionList) {
    const schema = typeToSchemaMap[option.datatype];
    dynamicOptionSchema[option.name] = schema || z.string();
  }
  return dynamicOptionSchema;
};
