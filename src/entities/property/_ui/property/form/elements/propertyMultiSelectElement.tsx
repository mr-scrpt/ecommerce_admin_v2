import { FC, memo } from "react";

import { PropertyDefaultSelectOption } from "@/kernel/domain/property/form.schema";
import { MultiSelectElementInner } from "@/shared/ui/select/multiSelectElement";
import { HTMLAttributes } from "react";
import { usePropertyListToSelectModel } from "../../../../_vm/usePropertyListToSelect.model";

export interface PropertyMultiSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  propertyListActive?: Array<PropertyDefaultSelectOption>;
  onSelectProperty: (propertyList: Array<PropertyDefaultSelectOption>) => void;
}

export const PropertyMultiSelectElement: FC<PropertyMultiSelectProps> = memo(
  (props) => {
    const { propertyListActive, onSelectProperty } = props;

    const { propertySelectOptionList } = usePropertyListToSelectModel();

    return (
      <MultiSelectElementInner
        optionList={propertySelectOptionList}
        optionActiveList={propertyListActive}
        onSelect={onSelectProperty}
      />
    );
  },
);

PropertyMultiSelectElement.displayName = "PropertyMultiSelectElement";
