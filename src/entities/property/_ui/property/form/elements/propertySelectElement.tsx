import { FC, memo } from "react";

import { SelectElement } from "@/shared/ui/select/selectElement";
import { HTMLAttributes } from "react";
import { usePropertyListToSelectModel } from "../../../../_vm/usePropertyListToSelect.model";
import { PropertyDefaultSelectOption } from "@/kernel/domain/property/form.schema";

export interface PropertySelectProps extends HTMLAttributes<HTMLDivElement> {
  propertyListActive?: PropertyDefaultSelectOption;
  onSelectProperty: (propertyList: Array<PropertyDefaultSelectOption>) => void;
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
