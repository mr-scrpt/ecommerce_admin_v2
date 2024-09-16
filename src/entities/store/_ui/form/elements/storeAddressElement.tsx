import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface StoreAddressElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  onChange: (value: string) => void;
  defaultValue?: string;
}

export const StoreAddressElement: FC<StoreAddressElementProps> = (props) => {
  const { onChange, defaultValue } = props;

  return (
    <FormControl>
      <Input
        placeholder="Store address"
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
