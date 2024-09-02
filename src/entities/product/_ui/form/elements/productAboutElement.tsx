import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface ProductAboutElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

export const ProductAboutElement: FC<ProductAboutElementProps> = (props) => {
  const { value, onChange } = props;

  return (
    <FormControl>
      <Input
        placeholder="Product About"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};
