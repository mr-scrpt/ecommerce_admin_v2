import { PROPERTY_DATATYPE_LIST } from "@/kernel/domain/property/ui.type";
import { PropertyDataTypeDefaultSelectOption } from "@/kernel/domain/property/form.schema";
import { DefaultSelectOption } from "@/shared/type/select";
import { useMemo } from "react";

export const usePropertyDataTypeToSelectModel = () => {
  // TODO: Change to server data
  const propertyDataTypeListToSelect: Array<PropertyDataTypeDefaultSelectOption> =
    useMemo(
      () =>
        PROPERTY_DATATYPE_LIST.map((item) => ({
          value: item.type,
          label: item.value,
          type: item.type,
        })),
      [],
    );

  return {
    propertyDataTypeListToSelect,
  };
};
