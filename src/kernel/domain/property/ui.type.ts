import { PropertyDataTypeEnum } from "./property.type";

export const DATATYPE_LIST = [
  { type: PropertyDataTypeEnum.SELECT, value: "Select" },
  { type: PropertyDataTypeEnum.MULT, value: "Multi select" },
  { type: PropertyDataTypeEnum.CHECKBOX, value: "Checkbox" },
  { type: PropertyDataTypeEnum.RADIO, value: "Radio" },
];

const [DataTypeDefaultElement] = DATATYPE_LIST;

export const DataTypeDefaultOption = {
  label: DataTypeDefaultElement.value,
  value: DataTypeDefaultElement.type,
};
