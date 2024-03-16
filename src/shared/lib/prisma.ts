// import { DATATYPE } from "@prisma/client";
// import { PropertyDataTypeEnum } from "../type/propertyDataType.enum";
//
// const prismaDatatypeToEnumMap: Record<DATATYPE, PropertyDataTypeEnum> = {
//   [DATATYPE.SELECT]: PropertyDataTypeEnum.SELECT,
//   [DATATYPE.MULT]: PropertyDataTypeEnum.MULT,
//   [DATATYPE.CHECKBOX]: PropertyDataTypeEnum.CHECKBOX,
//   [DATATYPE.RADIO]: PropertyDataTypeEnum.RADIO,
// };
//
// const enumDatatypeToPrismaMap: Record<PropertyDataTypeEnum, DATATYPE> = {
//   [PropertyDataTypeEnum.SELECT]: DATATYPE.SELECT,
//   [PropertyDataTypeEnum.MULT]: DATATYPE.MULT,
//   [PropertyDataTypeEnum.CHECKBOX]: DATATYPE.CHECKBOX,
//   [PropertyDataTypeEnum.RADIO]: DATATYPE.RADIO,
// };
//
// export const mapPrismaDatatypeToEnum = (
//   prismaDatatype: DATATYPE,
// ): PropertyDataTypeEnum => {
//   return prismaDatatypeToEnumMap[prismaDatatype];
// };
//
// export const mapEnumToPrismaDatatype = (
//   enumDatatype: PropertyDataTypeEnum,
// ): DATATYPE => {
//   return enumDatatypeToPrismaMap[enumDatatype];
// };
