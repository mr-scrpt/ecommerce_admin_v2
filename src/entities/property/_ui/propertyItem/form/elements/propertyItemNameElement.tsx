import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface PropertyItemNameElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  onChange: (value: string) => void;
  defaultValue?: string;
}

export const PropertyItemNameElement: FC<PropertyItemNameElementProps> = (
  props,
) => {
  const { onChange, defaultValue } = props;

  return (
    <FormControl>
      <Input
        placeholder="PropertyItem name"
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
