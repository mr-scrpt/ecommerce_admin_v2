import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface ProductArticleElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

export const ProductArticleElement: FC<ProductArticleElementProps> = (
  props,
) => {
  const { value, onChange } = props;

  return (
    <FormControl>
      <Input
        placeholder="Product Article"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};
