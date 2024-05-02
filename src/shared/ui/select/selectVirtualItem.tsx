import { FC, HTMLAttributes } from "react";
import { SelectItem } from "@/shared/ui/select";

interface SelectVirtualItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  handleClick: () => void;
}

export const SelectVirtualItem: FC<SelectVirtualItemProps> = (props) => {
  const { value, label, handleClick } = props;
  return (
    <SelectItem value={value} key={value} onClick={handleClick}>
      {label}
    </SelectItem>
  );
};
