import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface PropertyItemValueElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  onChange: (value: string) => void;
  defaultValue?: string;
}

export const PropertyItemValueElement: FC<PropertyItemValueElementProps> = (
  props,
) => {
  const { onChange, defaultValue } = props;

  return (
    <FormControl>
      <Input
        placeholder="PropertyItem value"
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
