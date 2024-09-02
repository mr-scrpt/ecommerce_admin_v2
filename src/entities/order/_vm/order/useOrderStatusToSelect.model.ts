import { ORDER_STATUS_LIST } from "@/kernel/domain/order/ui.type";
import { SelectOptionItem } from "@/shared/type/select";
import { useMemo } from "react";

export const useOrderStatusToSelectModel = () => {
  const orderStatusListToSelect: Array<SelectOptionItem> = useMemo(
    () =>
      ORDER_STATUS_LIST.map((item) => ({
        value: item.type,
        label: item.value,
      })),
    [],
  );

  return {
    orderStatusListToSelect,
  };
};
