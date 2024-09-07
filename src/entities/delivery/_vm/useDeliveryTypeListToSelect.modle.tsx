import { SelectDeliveryOptionItem } from "@/kernel/domain/delivery/deliveryType.schema";
import { useMemo } from "react";
import { useDeliveryTypeAvailableListQuery } from "../_query/deliveryTypeAvailableList.query";

export const useDeliveryTypeListToSelectModel = (settlementRef?: string) => {
  const { deliveryTypeAvailablList } =
    useDeliveryTypeAvailableListQuery(settlementRef);

  const deliveryTypeAvailableListToSelect: Array<SelectDeliveryOptionItem> =
    useMemo(
      () =>
        deliveryTypeAvailablList.map((item) => ({
          value: item.type,
          label: item.type,
        })),
      [deliveryTypeAvailablList],
    );
  return {
    deliveryTypeAvailableListToSelect,
  };
};
