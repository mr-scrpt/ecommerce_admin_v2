import { DATATYPE } from "@prisma/client";
import { OptionDataTypeEnum } from "./optionDataType.enum";

// Маппинг Prisma DATATYPE к OptionDataTypeEnum
const prismaToEnumMap: Record<DATATYPE, OptionDataTypeEnum> = {
  [DATATYPE.SELECT]: OptionDataTypeEnum.SELECT,
  [DATATYPE.MULT]: OptionDataTypeEnum.MULT,
  [DATATYPE.CHECKBOX]: OptionDataTypeEnum.CHECKBOX,
  [DATATYPE.RADIO]: OptionDataTypeEnum.RADIO,
};

// Маппинг OptionDataTypeEnum к Prisma DATATYPE
const enumToPrismaMap: Record<OptionDataTypeEnum, DATATYPE> = {
  [OptionDataTypeEnum.SELECT]: DATATYPE.SELECT,
  [OptionDataTypeEnum.MULT]: DATATYPE.MULT,
  [OptionDataTypeEnum.CHECKBOX]: DATATYPE.CHECKBOX,
  [OptionDataTypeEnum.RADIO]: DATATYPE.RADIO,
};

export const mapPrismaDatatypeToEnum = (
  prismaDatatype: DATATYPE,
): OptionDataTypeEnum => {
  return prismaToEnumMap[prismaDatatype];
};

export const mapEnumToPrismaDatatype = (
  enumDatatype: OptionDataTypeEnum,
): DATATYPE => {
  return enumToPrismaMap[enumDatatype];
};
