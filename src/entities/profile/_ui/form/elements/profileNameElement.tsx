import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface ProfileNameElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}
export const ProfileNameElement: FC<ProfileNameElementProps> = (props) => {
  const { value, onChange } = props;
  return (
    <FormControl>
      <Input
        placeholder="Profile Name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};
