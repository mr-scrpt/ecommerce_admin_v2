import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface ProductDescriptionElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

export const ProductDescriptionElement: FC<ProductDescriptionElementProps> = (
  props,
) => {
  const { value, onChange } = props;

  return (
    <FormControl>
      <Input
        placeholder="Product Description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};
