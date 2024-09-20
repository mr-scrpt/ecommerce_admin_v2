import { FC, HTMLAttributes } from "react";

import { PropertyItemDefaultSelectOption } from "@/kernel/domain/property/form.schema";
import { Spinner } from "@/shared/ui/icons/spinner";
import { RadioElement } from "@/shared/ui/radio/radioElement";
import { usePropertyItemRadioDataModel } from "../../../../_vm/propertyItem/form/usePropertyItemRadioData.model";

export interface PropertyItemRadioProps extends HTMLAttributes<HTMLDivElement> {
  propertyId: string;
  onSelectPropertyItem: (
    propertyItemList: Array<PropertyItemDefaultSelectOption>,
  ) => void;
  propertyItemListActive: Array<PropertyItemDefaultSelectOption>;
}
export const PropertyItemRadioElement: FC<PropertyItemRadioProps> = (props) => {
  const { propertyItemListActive, onSelectPropertyItem, propertyId } = props;

  const {
    handleSelect,
    propertyItemActiveFiltered,
    propertySelectOptionList,
    isSuccess,
    isPending,
    placeholder,
  } = usePropertyItemRadioDataModel({
    propertyId,
    onSelectPropertyItem,
    propertyItemListActive,
  });

  if (isPending || !isSuccess) {
    return <Spinner />;
  }

  return (
    <RadioElement
      optionActive={propertyItemActiveFiltered}
      onSelect={handleSelect}
      optionList={propertySelectOptionList}
      placeholder={placeholder}
    />
  );
};
