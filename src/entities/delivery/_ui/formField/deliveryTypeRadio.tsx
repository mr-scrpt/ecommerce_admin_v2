import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { FC, HTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { DeliveryFormDefaultValues } from "../../_domain/form.schema";
import { selectDataType } from "@/entities/property/_vm/selectDataType";
import { selectDeliveryType } from "../../_vm/selectDeliveryType";

interface DeliveryTypeRadioProps extends HTMLAttributes<HTMLDivElement> {}

export const DeliveryTypeRadio: FC<DeliveryTypeRadioProps> = (props) => {
  const { control } = useFormContext<DeliveryFormDefaultValues>();
  return (
    <FormField
      control={control}
      name="deliveryType"
      render={({ field }) => {
        return (
          <FormItem className="space-y-3">
            <FormLabel>Delivery type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                {selectDeliveryType.map((row) => (
                  <FormItem
                    key={row.type}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={row.type} />
                    </FormControl>
                    <FormLabel className="font-normal">{row.value}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
