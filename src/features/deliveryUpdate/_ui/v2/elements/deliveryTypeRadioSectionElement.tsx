import { FC, memo } from "react";

import { useDeliveryTypeListToSelectModel } from "@/entities/delivery";
import { DeliveryTypeFieldList } from "@/features/deliveryUpdate/_vm/deliveryTypeFieldList";
import { SelectOptionItem } from "@/shared/type/select";
import { FormControl, FormItem, FormLabel } from "@/shared/ui/form";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { HTMLAttributes } from "react";

export interface DeliveryTypeRadioSectionProps
  extends HTMLAttributes<HTMLDivElement> {
  deliveryActive?: SelectOptionItem;
  settlementRef?: string;
  onSelectDelivery: (delivery: SelectOptionItem) => void;
}

export const DeliveryTypeRadioSectionElement: FC<DeliveryTypeRadioSectionProps> =
  memo((props) => {
    const { deliveryActive, onSelectDelivery, settlementRef } = props;

    const { deliveryTypeAvailableListToSelect } =
      useDeliveryTypeListToSelectModel(settlementRef);

    return (
      <RadioGroup
        onValueChange={(value) => onSelectDelivery({ value, label: value })}
        defaultValue={deliveryActive?.value}
        value={deliveryActive?.value}
        className="flex flex-col space-y-1"
      >
        {deliveryTypeAvailableListToSelect.map((item) => {
          const deliveryTypeComponent = DeliveryTypeFieldList[item.value];
          return (
            <div
              className="flex w-full flex-col gap-2 border p-4"
              key={item.value}
            >
              <FormItem className="flex w-full items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value={item.value} />
                </FormControl>
                <FormLabel className="font-normal">{item.value}</FormLabel>
              </FormItem>

              {deliveryActive?.value === item.value &&
                deliveryTypeComponent &&
                deliveryTypeComponent.formElement.map((Element, index) => (
                  <Element
                    key={`${item.value}-${index}`}
                    settlementRef={settlementRef}
                  />
                ))}
            </div>
          );
        })}
      </RadioGroup>
    );
  });

DeliveryTypeRadioSectionElement.displayName = "DeliveryTypeRadioElement";
