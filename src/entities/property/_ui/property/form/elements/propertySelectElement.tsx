import { FC, memo } from "react";

import { SelectOptionItem } from "@/shared/type/select";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { HTMLAttributes } from "react";
import { usePropertyListToSelectModel } from "../../../../_vm/usePropertyListToSelect.model";

export interface PropertySelectProps extends HTMLAttributes<HTMLDivElement> {
  propertyListActive?: SelectOptionItem;
  onSelectProperty: (propertyList: Array<SelectOptionItem>) => void;
}

export const PropertySelectElement: FC<PropertySelectProps> = memo((props) => {
  const { propertyListActive, onSelectProperty } = props;

  const { propertySelectOptionList } = usePropertyListToSelectModel();

  return (
    <SelectElement
      optionList={propertySelectOptionList}
      optionActive={propertyListActive}
      onSelect={onSelectProperty}
    />
  );
});

PropertySelectElement.displayName = "PropertySelectElement";
