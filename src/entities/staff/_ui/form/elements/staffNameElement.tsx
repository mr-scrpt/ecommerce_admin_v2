import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface StaffNameElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}
export const StaffNameElement: FC<StaffNameElementProps> = (props) => {
  const { value, onChange } = props;
  return (
    <FormControl>
      <Input
        placeholder="Staff Name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};
