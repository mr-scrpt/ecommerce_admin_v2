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
import { DeliveryFormDefaultValues } from "../../_domain/form.schema";
// import { PostOfficeToSelect } from "../../_domain/postOffice.type";
import {
  PostOfficeToSelect,
  selectDeliveryType,
} from "../../_vm/selectDeliveryType";
import { DeliveryCourierField } from "./deliveryCourierField";
import { DeliveryPickupField } from "./deliveryPickupField";
import { DeliveryPostSelect } from "./deliveryPostSelect";
import { StoreToSelect } from "@/entities/store";
import { DeliveryTypeEnum } from "@/kernel/domain/delivery/delivery.type";

interface DeliveryTypeRadioProps extends HTMLAttributes<HTMLDivElement> {
  postOfficeListToSelect: PostOfficeToSelect[];
  storeListToSelect: StoreToSelect[];
}

export const DeliveryTypeRadio: FC<DeliveryTypeRadioProps> = (props) => {
  const { postOfficeListToSelect, storeListToSelect } = props;

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
                {Object.entries(selectDeliveryType).map(([key, row]) => {
                  if (
                    key === DeliveryTypeEnum.POST &&
                    !!postOfficeListToSelect.length
                  ) {
                    return (
                      <DeliveryPostSelect
                        key={key}
                        delivery={row}
                        postOfficeListToSelect={postOfficeListToSelect}
                        selected={field.value === DeliveryTypeEnum.POST}
                      />
                    );
                  }
                  if (key === DeliveryTypeEnum.PICKUP) {
                    return (
                      <DeliveryPickupField
                        delivery={row}
                        key={key}
                        selected={field.value === DeliveryTypeEnum.PICKUP}
                        storeListToSelect={storeListToSelect}
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
