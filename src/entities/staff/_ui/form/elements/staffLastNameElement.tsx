import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface StaffLastNameElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}
export const StaffLastNameElement: FC<StaffLastNameElementProps> = (props) => {
  const { value, onChange } = props;
  return (
    <FormControl>
      <Input
        placeholder="Staff LastName"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};
