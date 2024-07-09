import { AddressFormDefaultValues } from "../../../_domain/form.schema";
import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface AddressStreetElementsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  // field: ControllerRenderProps<AddressFormDefaultValues, "street">;
  onChange: (value: string) => void;
}

export const AddressStreetElement: FC<AddressStreetElementsProps> = (props) => {
  // const { field } = props;

  const { onChange } = props;
  return (
    <FormControl>
      <Input placeholder="Street" onChange={(e) => onChange(e.target.value)} />
    </FormControl>
  );
};
