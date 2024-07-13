import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface ReceiverNameElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  onChange: (value: string) => void;
}

export const ReceiverNameElement: FC<ReceiverNameElementProps> = (props) => {
  const { onChange } = props;
  return (
    <FormControl>
      <Input
        placeholder="Receiver name"
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};
