import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface AddressHouseElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  onChange: (value: string) => void;
}

export const AddressHouseElement: FC<AddressHouseElementProps> = (props) => {
  const { onChange } = props;

  return (
    <FormControl>
      <Input placeholder="House" onChange={(e) => onChange(e.target.value)} />
    </FormControl>
  );
};
