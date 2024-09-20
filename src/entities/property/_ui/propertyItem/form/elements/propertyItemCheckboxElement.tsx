import { FC, HTMLAttributes } from "react";

import { PropertyItemDefaultSelectOption } from "@/kernel/domain/property/form.schema";
import { CheckboxListElement } from "@/shared/ui/checkbox/checkboxListElement";
import { Spinner } from "@/shared/ui/icons/spinner";
import { usePropertyItemCheckboxDataModel } from "../../../../_vm/propertyItem/form/usePropertyItemCheckboxData.model";

export interface PropertyItemCheckboxProps<>extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onSelect"
  > {
  propertyId: string;
  onSelectPropertyItem: (
    propertyList: Array<PropertyItemDefaultSelectOption>,
  ) => void;
  propertyItemListActive: Array<PropertyItemDefaultSelectOption>;
}

export const PropertyItemCheckboxElement: FC<PropertyItemCheckboxProps> = (
  props,
) => {
  const { propertyId, onSelectPropertyItem, propertyItemListActive } = props;

  const {
    propertySelectOptionList,
    propertyItemActiveListFiltered,
    handleSelect,

    isPending,
    isSuccess,
    placeholder,
  } = usePropertyItemCheckboxDataModel({
    propertyId,
    propertyItemListActive,
    onSelectPropertyItem,
  });

  if (isPending || !isSuccess) {
    return <Spinner />;
  }

  return (
    <CheckboxListElement
      optionActiveList={propertyItemActiveListFiltered}
      onSelect={handleSelect}
      optionList={propertySelectOptionList}
      placeholder={placeholder}
    />
  );
};
