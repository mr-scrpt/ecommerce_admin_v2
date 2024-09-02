import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface OrderRowQuantityElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  onChange: (value: string) => void;
  value?: number;
}

export const OrderRowQuantityElement: FC<OrderRowQuantityElementProps> = (
  props,
) => {
  const { onChange, defaultValue } = props;

  return (
    <FormControl>
      <Input
        placeholder="Quantity"
        onChange={(e) => onChange(e.target.value)}
        value={defaultValue}
      />
    </FormControl>
  );
};
