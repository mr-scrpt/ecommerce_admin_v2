import { DATATYPE } from "@prisma/client";
import { PropertyDataTypeEnum } from "../type/propertyDataType.enum";
import { MultiSelectOptionItem } from "../ui/multiSelect";

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

type DataOptionItem = { id: string; name: string };

export const useOptionListTransform = () => {
  return {
    toOptionList: (dataList: Array<DataOptionItem>) =>
      dataList.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    toOptionListWithActive: (
      dataList: Array<DataOptionItem>,
      activeList: Array<DataOptionItem>,
    ) =>
      dataList.map((item) => ({
        value: item.id,
        label: item.name,
        active: activeList.some((activeItem) => activeItem.id === item.id),
      })),
    toDataIdList: (optionList: Array<MultiSelectOptionItem>) => {
      const res = optionList.map((item) => ({
        id: item.value,
        name: item.label,
      }));

      return res;
    },
  };
};
