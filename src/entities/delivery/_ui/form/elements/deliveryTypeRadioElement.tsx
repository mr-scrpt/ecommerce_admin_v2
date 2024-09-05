import { FC, memo } from "react";

import { SelectOptionItem } from "@/shared/type/select";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { HTMLAttributes } from "react";
import { useDeliveryTypeListToSelectModel } from "../../../_vm/useDeliveryTypeListToSelect.modle";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { FormControl, FormItem, FormLabel } from "@/shared/ui/form";

export interface DeliveryTypeRadioProps extends HTMLAttributes<HTMLDivElement> {
  deliveryActive?: SelectOptionItem;
  settlementRef?: string;
  onSelectDelivery: (delivery: SelectOptionItem) => void;
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
        {Object.entries(deliveryTypeAvailableListToSelect).map(([key, row]) => {
          return (
            <FormItem
              className="flex items-center space-x-3 space-y-0"
              key={key}
            >
              <FormControl>
                <RadioGroupItem value={row.value} />
              </FormControl>
              <FormLabel className="font-normal">{row.label}</FormLabel>
            </FormItem>
          );
          // if (key === DeliveryTypeEnum.POST && isPostAvailable) {
          //   return (
          //     <DeliveryPostSelect
          //       key={key}
          //       delivery={row}
          //       selected={deliveryType === DeliveryTypeEnum.POST}
          //     />
          //   );
          // }
          // if (key === DeliveryTypeEnum.PICKUP && isStoreAvailable) {
          //   return (
          //     <DeliveryStoreField
          //       key={key}
          //       delivery={row}
          //       selected={deliveryType === DeliveryTypeEnum.PICKUP}
          //     />
          //   );
          // }
          // if (key === DeliveryTypeEnum.COURIER && isCourierAvailable) {
          //   return (
          //     <DeliveryCourierField
          //       key={key}
          //       delivery={row}
          //       selected={deliveryType === DeliveryTypeEnum.COURIER}
          //     />
          //   );
          // }
        })}
      </RadioGroup>
    );
  },
);

DeliveryTypeRadioElement.displayName = "DeliveryTypeRadioElement";
