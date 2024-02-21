import { DATATYPE } from "@prisma/client";
import { OptionDataTypeEnum } from "../type/optionDataType.enum";

const prismaToEnumMap: Record<DATATYPE, OptionDataTypeEnum> = {
  [DATATYPE.SELECT]: OptionDataTypeEnum.SELECT,
  [DATATYPE.MULT]: OptionDataTypeEnum.MULT,
  [DATATYPE.CHECKBOX]: OptionDataTypeEnum.CHECKBOX,
  [DATATYPE.RADIO]: OptionDataTypeEnum.RADIO,
};

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
