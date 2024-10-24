import { FC, memo } from "react";

import { DeliveryTypeDefaultSelectOption } from "@/kernel/domain/delivery/form.schema";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { HTMLAttributes } from "react";
import { useDeliveryTypeListToSelectModel } from "../../../_vm/useDeliveryTypeListToSelect.modle";

export interface DeliveryTypeSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  deliveryActive?: DeliveryTypeDefaultSelectOption | null;
  settlementRef?: string;
  onSelectDelivery: (
    deliveryList: Array<DeliveryTypeDefaultSelectOption>,
  ) => void;
}

export const DeliveryTypeSelectElement: FC<DeliveryTypeSelectProps> = memo(
  (props) => {
    const { deliveryActive, onSelectDelivery, settlementRef } = props;

    const { deliveryTypeAvailableListToSelect } =
      useDeliveryTypeListToSelectModel(settlementRef);

    const placeholder = "Select delivery type";

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
