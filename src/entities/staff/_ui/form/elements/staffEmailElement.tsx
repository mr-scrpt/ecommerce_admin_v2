import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface StaffEmailElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}
export const StaffEmailElement: FC<StaffEmailElementProps> = (props) => {
  const { value, onChange } = props;
  return (
    <FormControl>
      <Input
        placeholder="Staff Email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};
