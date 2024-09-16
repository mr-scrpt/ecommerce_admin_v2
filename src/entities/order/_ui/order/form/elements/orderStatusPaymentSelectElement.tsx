import { FC, HTMLAttributes } from "react";

import { useOrderStatusPaymentToSelectModel } from "@/entities/order/_vm/order/useOrderStatusPaymentToSelect.model";
import { OrderDefaultSelectOption } from "@/kernel/domain/order/form.schema";
import { SelectElement } from "@/shared/ui/select/selectElement";

export interface OrderStatusPaymentSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  orderActive?: OrderDefaultSelectOption;
  onSelectOrderPayment: (orderList: Array<OrderDefaultSelectOption>) => void;
}
export const OrderStatusPaymentSelectElement: FC<
  OrderStatusPaymentSelectProps
> = (props) => {
  const { orderActive, onSelectOrderPayment } = props;

  const { orderStatusPaymentListToSelect } =
    useOrderStatusPaymentToSelectModel();

  const placeholder = "Select order status";

  return (
    <SelectElement
      optionActive={orderActive}
      onSelect={onSelectOrderPayment}
      optionList={orderStatusPaymentListToSelect}
      placeholder={placeholder}
    />
  );
};
