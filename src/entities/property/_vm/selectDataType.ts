import { PropertyDataTypeEnum } from "@/shared/type/propertyDataType.enum";

export const selectDataType = [
  { type: PropertyDataTypeEnum.SELECT, value: "Select" },
  { type: PropertyDataTypeEnum.MULT, value: "Multi select" },
  { type: PropertyDataTypeEnum.CHECKBOX, value: "Checkbox" },
  { type: PropertyDataTypeEnum.RADIO, value: "Radio" },
];
