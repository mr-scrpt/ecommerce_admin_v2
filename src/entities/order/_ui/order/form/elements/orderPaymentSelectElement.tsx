import { FC, HTMLAttributes } from "react";

import { useOrderPaymentStatusToSelectModel } from "@/entities/order/_vm/order/useOrderPaymentStatusToSelect.model";
import { SelectOptionItem } from "@/shared/type/select";
import { SelectElement } from "@/shared/ui/select/selectElement";

export interface OrderPaymentStatusSelectProps
  extends HTMLAttributes<HTMLDivElement> {
  orderActive?: SelectOptionItem;
  onSelectOrderPayment: (orderList: Array<SelectOptionItem>) => void;
}
export const OrderPaymentStatusSelectElement: FC<
  OrderPaymentStatusSelectProps
> = (props) => {
  const { orderActive, onSelectOrderPayment } = props;

  const { orderPaymentStatusListToSelect } =
    useOrderPaymentStatusToSelectModel();

  const placeholder = "Select order status";

  return (
    <SelectElement
      optionActive={orderActive}
      onSelect={onSelectOrderPayment}
      optionList={orderPaymentStatusListToSelect}
      placeholder={placeholder}
    />
  );
};
