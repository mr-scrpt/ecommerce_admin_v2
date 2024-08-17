import { FC, memo } from "react";

import { MultiSelectElement } from "@/shared/ui/select/multiSelectElement";
import { HTMLAttributes } from "react";
import { usePropertyListToSelectModel } from "../../../_vm/usePropertyListToSelect.model";
import { SelectOptionItem } from "@/shared/type/select";

export interface PropertyMultiSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  propertyListActive?: Array<SelectOptionItem>;
  onSelectProperty: (propertyList: Array<SelectOptionItem>) => void;
}

export const PropertyMultiSelectElement: FC<PropertyMultiSelectProps> = memo(
  (props) => {
    const { propertyListActive, onSelectProperty } = props;

    const { propertySelectOptionList } = usePropertyListToSelectModel();

    return (
      <MultiSelectElement
        optionList={propertySelectOptionList}
        optionActiveList={propertyListActive}
        onSelect={onSelectProperty}
      />
    );
  },
);

PropertyMultiSelectElement.displayName = "PropertyMultiSelectElement";
