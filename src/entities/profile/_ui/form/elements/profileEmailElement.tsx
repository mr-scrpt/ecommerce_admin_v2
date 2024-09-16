import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";

interface ProfileEmailElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}
export const ProfileEmailElement: FC<ProfileEmailElementProps> = (props) => {
  const { value, onChange } = props;
  return (
    <FormControl>
      <Input
        placeholder="Profile Email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};
