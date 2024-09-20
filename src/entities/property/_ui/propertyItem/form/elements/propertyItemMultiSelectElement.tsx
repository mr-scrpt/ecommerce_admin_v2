import { FC, memo } from "react";

import { PropertyItemDefaultSelectOption } from "@/kernel/domain/property/form.schema";
import { MultiSelectElement } from "@/shared/ui/select/multiSelectElement";
import { HTMLAttributes } from "react";
import { usePropertyItemMultiSelectDataModel } from "../../../../_vm/propertyItem/form/usePropertyItemMultiSelectData.model";

export interface PropertyItemMultiSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  propertyId: string;
  onSelectPropertyItem: (
    propertyList: Array<PropertyItemDefaultSelectOption>,
  ) => void;
  propertyItemListActive: Array<PropertyItemDefaultSelectOption>;
}

export const PropertyItemMultiSelectElement: FC<PropertyItemMultiSelectProps> =
  memo((props) => {
    const { propertyItemListActive, onSelectPropertyItem, propertyId } = props;

    const {
      propertySelectOptionList,
      propertyItemActiveListFiltered,
      handleSelect,
    } = usePropertyItemMultiSelectDataModel({
      propertyId,
      propertyItemListActive,
      onSelectPropertyItem,
    });

    return (
      <MultiSelectElement
        optionList={propertySelectOptionList}
        optionActiveList={propertyItemActiveListFiltered}
        onSelect={handleSelect}
      />
    );
  });

PropertyItemMultiSelectElement.displayName = "PropertyItemMultiSelectElement";
