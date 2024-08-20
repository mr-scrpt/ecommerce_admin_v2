import { PropertyDataTypeEnum } from "@/kernel/domain/property/property.type";
import { SelectOptionItem } from "@/shared/type/select";
import { useMemo } from "react";

export const DATATYPE = [
  { type: PropertyDataTypeEnum.SELECT, value: "Select" },
  { type: PropertyDataTypeEnum.MULT, value: "Multi select" },
  { type: PropertyDataTypeEnum.CHECKBOX, value: "Checkbox" },
  { type: PropertyDataTypeEnum.RADIO, value: "Radio" },
];

const [DataTypeDefaultElement] = DATATYPE;
export const DataTypeDefaultOption = {
  label: DataTypeDefaultElement.value,
  value: DataTypeDefaultElement.type,
};

export const useDataTypeToSelect = () => {
  const dataTypeListToSelect: Array<SelectOptionItem> = useMemo(
    () =>
      DATATYPE.map((item) => ({
        value: item.type,
        label: item.value,
      })),
    [],
  );

  return {
    dataTypeListToSelect,
  };
};
