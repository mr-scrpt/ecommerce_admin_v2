import { SelectItem } from "@/shared/ui/select";
import { FC } from "react";
import { ListChildComponentProps } from "react-window";
import { PostOfficeToSelect } from "../../_domain/postOffice.type";

export const SelectVirtualItem: FC<
  ListChildComponentProps<PostOfficeToSelect[]>
> = (props) => {
  const { data, index, style } = props;
  const item = data[index];

  return (
    <SelectItem value={item.value} key={item.value} style={style}>
      {item.label}
    </SelectItem>
  );
};
