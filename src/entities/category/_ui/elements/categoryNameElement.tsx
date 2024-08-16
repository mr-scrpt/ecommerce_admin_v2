import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface CategoryNameElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  onChange: (value: string) => void;
}

export const CategoryNameElement: FC<CategoryNameElementProps> = (props) => {
  const { onChange } = props;

  return (
    <FormControl>
      <Input
        placeholder="Category name"
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};
