import { FC, memo } from "react";

import { DefaultSelectOption } from "@/shared/type/select";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { HTMLAttributes } from "react";
import { useDeliveryTypeListToSelectModel } from "../../../_vm/useDeliveryTypeListToSelect.modle";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { FormControl, FormItem, FormLabel } from "@/shared/ui/form";
import { DeliveryTypeDefaultSelectOption } from "@/kernel/domain/delivery/form.schema";

export interface DeliveryTypeRadioProps extends HTMLAttributes<HTMLDivElement> {
  deliveryActive?: DeliveryTypeDefaultSelectOption | null;
  settlementRef?: string;
  onSelectDelivery: (delivery: DefaultSelectOption) => void;
}

export const DeliveryTypeRadioElement: FC<DeliveryTypeRadioProps> = memo(
  (props) => {
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
          return (
            <FormItem
              className="flex items-center space-x-3 space-y-0"
              key={item.value}
            >
              <FormControl>
                <RadioGroupItem value={item.value} />
              </FormControl>
              <FormLabel className="font-normal">{item.label}</FormLabel>
            </FormItem>
          );
        })}
      </RadioGroup>
    );
  },
);

DeliveryTypeRadioElement.displayName = "DeliveryTypeRadioElement";
