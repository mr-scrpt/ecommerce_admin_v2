import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface ConsumerLastNameElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}
export const ConsumerLastNameElement: FC<ConsumerLastNameElementProps> = (
  props,
) => {
  const { value, onChange } = props;
  return (
    <FormControl>
      <Input
        placeholder="Consumer LastName"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};
