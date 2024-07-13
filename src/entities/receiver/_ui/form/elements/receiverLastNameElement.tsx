import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface ReceiverLastNameElementsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  onChange: (value: string) => void;
}

export const ReceiverLastNameElement: FC<ReceiverLastNameElementsProps> = (
  props,
) => {
  const { onChange } = props;
  return (
    <FormControl>
      <Input
        placeholder="Receiver last name"
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};
