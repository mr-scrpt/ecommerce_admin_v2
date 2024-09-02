import { DATATYPE_LIST } from "@/kernel/domain/property/ui.type";
import { SelectOptionItem } from "@/shared/type/select";
import { useMemo } from "react";

export const useDataTypeToSelectModel = () => {
  const dataTypeListToSelect: Array<SelectOptionItem> = useMemo(
    () =>
      DATATYPE_LIST.map((item) => ({
        value: item.type,
        label: item.value,
      })),
    [],
  );

  return {
    dataTypeListToSelect,
  };
};
