import { FC, memo } from "react";

import { SelectOptionItem } from "@/shared/type/select";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { HTMLAttributes } from "react";
import { useDeliveryTypeListToSelectModel } from "../../../_vm/useDeliveryTypeListToSelect.modle";

export interface DeliveryTypeSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  deliveryActive?: SelectOptionItem;
  onSelectDelivery: (deliveryList: Array<SelectOptionItem>) => void;
}

export const DeliveryTypeSelectElement: FC<DeliveryTypeSelectProps> = memo(
  (props) => {
    const { deliveryActive, onSelectDelivery } = props;

    const { deliveryTypeListToSelect } = useDeliveryTypeListToSelectModel();

    const placeholder = "Select delivery type";

    return (
      <SelectElement
        optionList={deliveryTypeListToSelect}
        optionActive={deliveryActive}
        placeholder={placeholder}
        onSelect={onSelectDelivery}
      />
    );
  },
);

DeliveryTypeSelectElement.displayName = "DeliverySelectElement";
