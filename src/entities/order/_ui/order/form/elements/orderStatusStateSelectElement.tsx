import { FC, HTMLAttributes } from "react";

import { OrderStatusStateDefaultSelectOption } from "@/kernel/domain/order/form.schema";
import { SelectElement } from "@/shared/ui/select/selectElement";
import { useOrderStatusStateToSelectModel } from "../../../../_vm/order/useOrderStatusStateToSelect.model";

export interface OrderStatusStateSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  orderActive?: OrderStatusStateDefaultSelectOption;
  onSelectOrder: (
    orderList: Array<OrderStatusStateDefaultSelectOption>,
  ) => void;
}
export const OrderStatusStateSelectElement: FC<OrderStatusStateSelectProps> = (
  props,
) => {
  const { orderActive, onSelectOrder } = props;

  const { orderStatusStateListToSelect } = useOrderStatusStateToSelectModel();

  const placeholder = "Select order status";

  return (
    <SelectElement
      optionActive={orderActive}
      onSelect={onSelectOrder}
      optionList={orderStatusStateListToSelect}
      placeholder={placeholder}
    />
  );
};
