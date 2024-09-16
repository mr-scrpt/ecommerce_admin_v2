import { useMemo } from "react";
import { useDeliveryTypeAvailableListQuery } from "../_query/deliveryTypeAvailableList.query";
import { DeliveryTypeDefaultSelectOption } from "@/kernel/domain/delivery/form.schema";

export const useDeliveryTypeListToSelectModel = (settlementRef?: string) => {
  const { deliveryTypeAvailablList } =
    useDeliveryTypeAvailableListQuery(settlementRef);

  const deliveryTypeAvailableListToSelect: Array<DeliveryTypeDefaultSelectOption> =
    useMemo(
      () =>
        deliveryTypeAvailablList.map((item) => ({
          value: item.id,
          label: item.type,
          type: item.type,
        })),
      [deliveryTypeAvailablList],
    );
  return {
    deliveryTypeAvailableListToSelect,
  };
};
