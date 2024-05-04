import { FC, HTMLAttributes } from "react";
import { SelectItem } from "@/shared/ui/select";
import { VirtualItem } from "@tanstack/react-virtual";

interface SelectItem {
  value: string;
  [key: string]: any;
}
interface SelectVirtualItemProps<T extends SelectItem>
  extends HTMLAttributes<HTMLDivElement> {
  virtualData: VirtualItem;
  item: T;
  onSelect: () => void;
  // isSelected: boolean;
}

export const SelectVirtualItem: FC<SelectVirtualItemProps<SelectItem>> = (
  props,
) => {
  const { virtualData, item, style, onSelect } = props;

  const { size, start } = virtualData;
  const { value } = item;

  return (
    <SelectItem value={value} key={value} style={style} onSelect={onSelect}>
      {item.label}
    </SelectItem>
  );
};
//
// interface SelectVirtualItemProps extends HTMLAttributes<HTMLDivElement> {
//   value: string;
//   label: string;
// }
//
// export const SelectVirtualItem: FC<
//   ListChildComponentProps<SelectVirtualItemProps[]>
// > = (props) => {
//   const { data, index, style } = props;
//   const item = data[index];
//
//   return (
//     <SelectItem value={item.value} key={item.value} style={style}>
//       {item.label}
//     </SelectItem>
//   );
// };
