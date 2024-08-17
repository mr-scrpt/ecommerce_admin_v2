import { FC, HTMLAttributes } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { FormControl } from "../form";
import { SelectOptionItem } from "@/shared/type/select";

interface selectElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect: (items: Array<SelectOptionItem>) => void;
  optionList: Array<SelectOptionItem>;
  optionActive?: SelectOptionItem;
  placeholder?: string;
}

export const SelectElement: FC<selectElementProps> = (props) => {
  const {
    optionActive,
    optionList,
    placeholder = "Select...",
    onSelect,
  } = props;
  const defaultValue = optionActive?.value || "";
  return (
    <Select
      defaultValue={defaultValue}
      value={defaultValue}
      onValueChange={(value) => {
        const selectedOption = optionList.find((item) => item.value === value);

        if (!selectedOption) return;

        onSelect([selectedOption]);
      }}
      disabled={!optionList.length}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {optionList.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
