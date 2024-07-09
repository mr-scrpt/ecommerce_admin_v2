import { AddressFormDefaultValues } from "../../../_domain/form.schema";
import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface AddressHouseElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  // field: ControllerRenderProps<AddressFormDefaultValues, "house">;
  onChange: (value: string) => void;
}

export const AddressHouseElement: FC<AddressHouseElementProps> = (props) => {
  const { onChange } = props;

  return (
    <FormControl>
      <Input placeholder="House" onChange={(e) => onChange(e.target.value)} />
    </FormControl>
  );
};
