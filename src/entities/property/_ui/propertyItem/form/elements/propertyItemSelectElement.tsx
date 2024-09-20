import { FC, HTMLAttributes } from "react";

import { PropertyItemDefaultSelectOption } from "@/kernel/domain/property/form.schema";
import { Spinner } from "@/shared/ui/icons/spinner";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { usePropertyItemSelectDataModel } from "../../../../_vm/propertyItem/form/usePropertyItemSelectData.model";

export interface PropertyItemSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  propertyId: string;
  onSelectPropertyItem: (
    propertyItemList: Array<PropertyItemDefaultSelectOption>,
  ) => void;
  propertyItemListActive: Array<PropertyItemDefaultSelectOption>;
}
export const PropertyItemSelectElement: FC<PropertyItemSelectProps> = (
  props,
) => {
  const { propertyItemListActive, onSelectPropertyItem, propertyId } = props;

  const {
    propertySelectOptionList,
    propertyItemActiveFiltered,
    isPending,
    isSuccess,
    handleSelect,
    placeholder,
  } = usePropertyItemSelectDataModel({
    propertyId,
    onSelectPropertyItem,
    propertyItemListActive,
  });

  if (isPending || !isSuccess) {
    return <Spinner />;
  }

  return (
    <SelectElement
      optionActive={propertyItemActiveFiltered}
      onSelect={handleSelect}
      optionList={propertySelectOptionList}
      placeholder={placeholder}
    />
  );
};
