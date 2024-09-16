import { PropertyDataTypeDefaultSelectOption } from "@/kernel/domain/property/form.schema";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { FC, HTMLAttributes } from "react";
import { usePropertyDataTypeToSelectModel } from "../../../../_vm/useDataTypeToSelect.model";

interface PropertyDataTypeSelectElementProps
  extends HTMLAttributes<HTMLDivElement> {
  datatypeActive?: PropertyDataTypeDefaultSelectOption;
  onSelectDatatype: (
    categoryList: Array<PropertyDataTypeDefaultSelectOption>,
  ) => void;
}

export const PropertyDataTypeSelectElement: FC<
  PropertyDataTypeSelectElementProps
> = (props) => {
  const { datatypeActive, onSelectDatatype } = props;
  const { propertyDataTypeListToSelect } = usePropertyDataTypeToSelectModel();

  const placeholder = "Select data type";

  return (
    <SelectElement
      optionList={propertyDataTypeListToSelect}
      optionActive={datatypeActive}
      placeholder={placeholder}
      onSelect={onSelectDatatype}
    />
  );
};
