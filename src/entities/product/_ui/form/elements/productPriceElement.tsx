import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface ProductPriceElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number;
  onChange: (value: number) => void;
}

export const ProductPriceElement: FC<ProductPriceElementProps> = (props) => {
  const { value, onChange } = props;

  return (
    <FormControl>
      <Input
        placeholder="Product Price"
        value={value}
        onChange={(e) => onChange(+e.target.value)}
      />
    </FormControl>
  );
};
