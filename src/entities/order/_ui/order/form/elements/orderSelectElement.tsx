import { FC, HTMLAttributes } from "react";

import { useOrderStatusToSelectModel } from "@/entities/order/_vm/order/useOrderStatusToSelect.model";
import { SelectOptionItem } from "@/shared/type/select";
import { SelectElement } from "@/shared/ui/select/selectElement";

export interface OrderStatusSelectProps extends HTMLAttributes<HTMLDivElement> {
  orderActive?: SelectOptionItem;
  onSelectOrder: (orderList: Array<SelectOptionItem>) => void;
}
export const OrderStatusSelectElement: FC<OrderStatusSelectProps> = (props) => {
  const { orderActive, onSelectOrder } = props;

  const { orderStatusListToSelect } = useOrderStatusToSelectModel();

  const placeholder = "Select order status";

  return (
    <SelectElement
      optionActive={orderActive}
      onSelect={onSelectOrder}
      optionList={orderStatusListToSelect}
      placeholder={placeholder}
    />
  );
};
