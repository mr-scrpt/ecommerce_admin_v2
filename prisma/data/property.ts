import { PropertyDataTypeEnum } from "../../src/shared/type/propertyDataType.enum";

export const propertyListSeed = [
  {
    id: "property_585fsddfew7898dd",
    name: "Size",
    datatype: PropertyDataTypeEnum.SELECT,
    isFilter: true,
  },
  {
    id: "property_11fsddfew7898186",
    name: "Color",
    datatype: PropertyDataTypeEnum.MULT,
    isFilter: true,
  },
  {
    id: "property_195fsd55846fddew",
    name: "Type",
    datatype: PropertyDataTypeEnum.CHECKBOX,
    isFilter: false,
  },
  {
    id: "property_eeesddfew789855",
    name: "New",
    datatype: PropertyDataTypeEnum.RADIO,
    isFilter: true,
  },
];
