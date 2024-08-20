import { SelectOptionItem } from "@/shared/type/select";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { FC, HTMLAttributes } from "react";
import { useDataTypeToSelect } from "../../../../_vm/useSelectDataType";

interface PropertyDataTypeSelectElementProps
  extends HTMLAttributes<HTMLDivElement> {
  datatypeActive?: SelectOptionItem;
  onSelectDatatype: (categoryList: Array<SelectOptionItem>) => void;
}

export const PropertyDataTypeSelectElement: FC<
  PropertyDataTypeSelectElementProps
> = (props) => {
  const { datatypeActive, onSelectDatatype } = props;
  const { dataTypeListToSelect } = useDataTypeToSelect();
  const placeholder = "Select data type";
  return (
    <SelectElement
      optionList={dataTypeListToSelect}
      optionActive={datatypeActive}
      placeholder={placeholder}
      onSelect={onSelectDatatype}
    />
  );
};
