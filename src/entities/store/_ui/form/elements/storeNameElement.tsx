import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface StoreNameElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  onChange: (value: string) => void;
  defaultValue?: string;
}

export const StoreNameElement: FC<StoreNameElementProps> = (props) => {
  const { onChange, defaultValue } = props;

  return (
    <FormControl>
      <Input
        placeholder="Store name"
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
