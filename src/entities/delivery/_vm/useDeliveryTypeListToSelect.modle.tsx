import { DELIVERY_TYPE_LIST } from "@/kernel/domain/delivery/ui.type";
import { SelectOptionItem } from "@/shared/type/select";
import { useMemo } from "react";

export const useDeliveryTypeListToSelectModel = () => {
  const deliveryTypeListToSelect: Array<SelectOptionItem> = useMemo(
    () =>
      DELIVERY_TYPE_LIST.map((item) => ({
        value: item.type,
        label: item.value,
      })),
    [],
  );
  return {
    deliveryTypeListToSelect,
  };
};
