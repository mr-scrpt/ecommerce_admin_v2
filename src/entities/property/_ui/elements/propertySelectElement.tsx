import { FC, memo } from "react";

import { MultiSelect } from "@/shared/ui/multiSelect";
import { HTMLAttributes } from "react";
import { usePropertyListToSelectModel } from "../../_vm/usePropertyListToSelect.model";
import { SelectItemValues } from "@/shared/type/select";

export interface PropertySelectProps extends HTMLAttributes<HTMLDivElement> {
  propertyListActive?: Array<SelectItemValues>;
  onSelectProperty: (propertyList: Array<SelectItemValues>) => void;
}

export const PropertySelectElement: FC<PropertySelectProps> = memo((props) => {
  const { propertyListActive, onSelectProperty } = props;

  const { propertySelectOptionList } = usePropertyListToSelectModel();

  return (
    <MultiSelect
      optionList={propertySelectOptionList}
      optionActiveList={propertyListActive}
      onSelected={onSelectProperty}
    />
  );
});

PropertySelectElement.displayName = "PropertySelectElement";
