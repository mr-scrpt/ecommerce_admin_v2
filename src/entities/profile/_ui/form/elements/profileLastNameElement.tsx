import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface ProfileLastNameElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}
export const ProfileLastNameElement: FC<ProfileLastNameElementProps> = (
  props,
) => {
  const { value, onChange } = props;
  return (
    <FormControl>
      <Input
        placeholder="Profile LastName"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};
