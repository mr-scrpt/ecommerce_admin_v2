import { SelectItem } from "@/shared/ui/select";
import { VirtualItem } from "@tanstack/react-virtual";
import { FC, HTMLAttributes } from "react";
import { PostOfficeToSelect } from "../../_domain/post.type";

interface ComboboxVirtualItemProps<T> extends HTMLAttributes<HTMLDivElement> {
  virtualData: VirtualItem;
  item: T;
  onSelect: () => void;
  // isSelected: boolean;
}
export const PostOfficeComboboxItem: FC<
  ComboboxVirtualItemProps<PostOfficeToSelect>
> = (props) => {
  const { virtualData, item, style, onSelect } = props;

  const { size, start } = virtualData;
  const { value } = item;

  return (
    <SelectItem
      value={value}
      key={value}
      // style={style}
      onSelect={onSelect}
      // style={{
      //   position: "absolute",
      //   top: 0,
      //   left: 0,
      //   width: "100%",
      //   height: `${size}px`,
      //   transform: `translateY(${start}px)`,
      // }}
    >
      {item.label}
    </SelectItem>
  );
};
// export const SelectVirtualItemPost: FC<
//   ListChildComponentProps<PostOfficeToSelect[]>
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
