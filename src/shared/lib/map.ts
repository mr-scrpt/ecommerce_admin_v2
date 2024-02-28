import { DATATYPE } from "@prisma/client";
import { OptionDataTypeEnum } from "../type/optionDataType.enum";
import { MultiSelectOptionItem } from "../ui/multiSelect";

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
