import { ORDER_PAYMENT_STATUS_LIST } from "@/kernel/domain/order/ui.type";
import { SelectOptionItem } from "@/shared/type/select";
import { useMemo } from "react";

export const useOrderPaymentStatusToSelectModel = () => {
  const orderPaymentStatusListToSelect: Array<SelectOptionItem> = useMemo(
    () =>
      ORDER_PAYMENT_STATUS_LIST.map((item) => ({
        value: item.type,
        label: item.value,
      })),
    [],
  );

  return {
    orderPaymentStatusListToSelect,
  };
};
