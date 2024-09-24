import { FC, memo } from "react";

import { useDeliveryTypeListToSelectModel } from "@/entities/delivery";
import { DeliveryTypeFieldList } from "../../../_vm/deliveryTypeFieldList";
import { FormControl, FormItem, FormLabel } from "@/shared/ui/form";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { HTMLAttributes } from "react";
import { DeliveryTypeDefaultSelectOption } from "@/kernel/domain/delivery/form.schema";

export interface DeliveryTypeRadioSectionProps
  extends HTMLAttributes<HTMLDivElement> {
  deliveryActive?: DeliveryTypeDefaultSelectOption | null;
  settlementRef: string;
  deliveryId: string;
  onSelectDelivery: (delivery: DeliveryTypeDefaultSelectOption) => void;
}

export const DeliveryTypeRadioSectionElement: FC<DeliveryTypeRadioSectionProps> =
  memo((props) => {
    const { deliveryActive, onSelectDelivery, settlementRef, deliveryId } =
      props;

    const { deliveryTypeAvailableListToSelect } =
      useDeliveryTypeListToSelectModel(settlementRef);

    const onChange = (value: string) => {
      const type = deliveryTypeAvailableListToSelect.find(
        (item) => item.value === value,
      )?.type;

      if (!type) {
        return;
      }

      onSelectDelivery({
        value,
        label: value,
        type,
      });
    };

    return (
      <RadioGroup
        onValueChange={onChange}
        defaultValue={deliveryActive?.value}
        value={deliveryActive?.value}
        className="flex flex-col space-y-1"
      >
        {deliveryTypeAvailableListToSelect.map((item) => {
          const deliveryTypeComponent = DeliveryTypeFieldList[item.type];
          return (
            <div
              className="flex w-full flex-col gap-2 border p-4"
              key={item.value}
            >
              <FormItem className="flex w-full items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value={item.value} />
                </FormControl>
                <FormLabel className="font-normal">{item.label}</FormLabel>
              </FormItem>

              {deliveryActive?.value === item.value &&
                deliveryTypeComponent &&
                deliveryTypeComponent.formElement.map((Element, index) => (
                  <Element
                    key={`${item.value}-${index}`}
                    settlementRef={settlementRef}
                    deliveryId={deliveryId}
                  />
                ))}
            </div>
          );
        })}
      </RadioGroup>
    );
  });

DeliveryTypeRadioSectionElement.displayName = "DeliveryTypeRadioSectionElement";
