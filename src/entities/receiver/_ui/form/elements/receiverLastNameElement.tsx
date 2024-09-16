import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface ReceiverLastNameElementsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

export const ReceiverLastNameElement: FC<ReceiverLastNameElementsProps> = (
  props,
) => {
  const { onChange, value } = props;
  return (
    <FormControl>
      <Input
        placeholder="Receiver last name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};
