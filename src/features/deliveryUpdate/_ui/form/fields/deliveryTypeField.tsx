import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { RadioGroup } from "@/shared/ui/radio-group";
import { FC, HTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
// import { DeliveryTypeEnum } from "../../_domain/delivery.types";
// import { PostOfficeToSelect } from "../../_domain/postOffice.type";
import { DeliveryFormDefaultValues } from "@/entities/delivery";
import { DeliveryTypeEnum } from "@/kernel/domain/delivery/delivery.type";
import { DeliveryCourierField } from "./deliveryCourierField";
import { DeliveryStoreField } from "./deliveryPickupField";
import { DeliveryPostSelect } from "./deliveryPostField";
import { DeliveryTypeFieldList } from "@/features/deliveryUpdate/_vm/deliveryTypeFieldList";

interface DeliveryTypeRadioProps extends HTMLAttributes<HTMLDivElement> {}

export const DeliveryTypeField: FC<DeliveryTypeRadioProps> = (props) => {
  const { control } = useFormContext<DeliveryFormDefaultValues>();

  return (
    <FormField
      control={control}
      name="deliveryType"
      render={({ field }) => {
        console.log("output_log: deliveryType =>>>", field.value);
        return (
          <FormItem className="space-y-3">
            <FormLabel>Delivery type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                className="flex flex-col space-y-1"
              >
                {Object.entries(DeliveryTypeFieldList).map(([key, row]) => {
                  if (key === DeliveryTypeEnum.POST) {
                    return (
                      <DeliveryPostSelect
                        key={key}
                        delivery={row}
                        selected={field.value === DeliveryTypeEnum.POST}
                      />
                    );
                  }
                  if (key === DeliveryTypeEnum.PICKUP) {
                    return (
                      <DeliveryStoreField
                        key={key}
                        delivery={row}
                        selected={field.value === DeliveryTypeEnum.PICKUP}
                      />
                    );
                  }
                  if (key === DeliveryTypeEnum.COURIER) {
                    return (
                      <DeliveryCourierField
                        key={key}
                        delivery={row}
                        selected={field.value === DeliveryTypeEnum.COURIER}
                      />
                    );
                  }
                })}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
