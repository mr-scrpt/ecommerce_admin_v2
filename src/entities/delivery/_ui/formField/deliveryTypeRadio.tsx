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
                  <div
                    key={row.type}
                    className="flex w-full flex-col gap-2 border p-4"
                  >
                    <FormItem
                      key={row.type}
                      className="flex w-full items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={row.type} />
                      </FormControl>
                      <FormLabel className="font-normal">{row.value}</FormLabel>
                    </FormItem>
                    {field.value === row.type &&
                      row.formElement.length > 0 &&
                      row.formElement.map((row) => row())}
                  </div>
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
