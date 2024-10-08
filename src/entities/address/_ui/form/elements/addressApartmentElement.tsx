import { AddressFormDefaultValues } from "../../../_domain/form.schema";
import { FormControl } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FC, HTMLAttributes } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface AddressApartmentElementProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  // field: ControllerRenderProps<AddressFormDefaultValues, "appartment">;
  value: string;
  onChange: (value: string) => void;
}

export const AddressApartmentElement: FC<AddressApartmentElementProps> = (
  props,
) => {
  const { value, onChange } = props;
  return (
    <FormControl>
      <Input
        placeholder="Apartment"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};
