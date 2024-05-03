import { FC, HTMLAttributes } from "react";
import { SelectItem } from "@/shared/ui/select";
import { ListChildComponentProps } from "react-window";

interface SelectVirtualItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
}

export const SelectVirtualItem: FC<
  ListChildComponentProps<SelectVirtualItemProps[]>
> = (props) => {
  const { data, index, style } = props;
  const item = data[index];

  return (
    <SelectItem value={item.value} key={item.value} style={style}>
      {item.label}
    </SelectItem>
  );
};
