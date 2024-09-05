import { FC, memo } from "react";

import { SelectOptionItem } from "@/shared/type/select";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { HTMLAttributes } from "react";
import { useDeliveryTypeListToSelectModel } from "../../../_vm/useDeliveryTypeListToSelect.modle";

export interface DeliveryTypeSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  deliveryActive?: SelectOptionItem;
  settlementRef?: string;
  onSelectDelivery: (deliveryList: Array<SelectOptionItem>) => void;
}

export const DeliveryTypeSelectElement: FC<DeliveryTypeSelectProps> = memo(
  (props) => {
    const { deliveryActive, onSelectDelivery, settlementRef } = props;

    const { deliveryTypeAvailableListToSelect } =
      useDeliveryTypeListToSelectModel(settlementRef);

    const placeholder = "Select delivery type";

    // console.log(
    //   "output_log: deliveryTypeAvailableListToSelect =>>>",
    //   deliveryTypeAvailableListToSelect,
    // );

    return (
      <SelectElement
        optionList={deliveryTypeAvailableListToSelect}
        optionActive={deliveryActive}
        placeholder={placeholder}
        onSelect={onSelectDelivery}
      />
    );
  },
);

DeliveryTypeSelectElement.displayName = "DeliverySelectElement";
