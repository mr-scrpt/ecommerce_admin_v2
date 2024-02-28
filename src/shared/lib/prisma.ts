import { DATATYPE } from "@prisma/client";
import { PropertyDataTypeEnum } from "../type/propertyDataType.enum";

const prismaToEnumMap: Record<DATATYPE, PropertyDataTypeEnum> = {
  [DATATYPE.SELECT]: PropertyDataTypeEnum.SELECT,
  [DATATYPE.MULT]: PropertyDataTypeEnum.MULT,
  [DATATYPE.CHECKBOX]: PropertyDataTypeEnum.CHECKBOX,
  [DATATYPE.RADIO]: PropertyDataTypeEnum.RADIO,
};

const enumToPrismaMap: Record<PropertyDataTypeEnum, DATATYPE> = {
  [PropertyDataTypeEnum.SELECT]: DATATYPE.SELECT,
  [PropertyDataTypeEnum.MULT]: DATATYPE.MULT,
  [PropertyDataTypeEnum.CHECKBOX]: DATATYPE.CHECKBOX,
  [PropertyDataTypeEnum.RADIO]: DATATYPE.RADIO,
};

export const mapPrismaDatatypeToEnum = (
  prismaDatatype: DATATYPE,
): PropertyDataTypeEnum => {
  return prismaToEnumMap[prismaDatatype];
};

export const mapEnumToPrismaDatatype = (
  enumDatatype: PropertyDataTypeEnum,
): DATATYPE => {
  return enumToPrismaMap[enumDatatype];
};
