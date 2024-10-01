import { buildDeliveryTypeOptionsArray } from "@/kernel/domain/delivery/form.schema";
import { useDeliveryTypeAvailableListQuery } from "../_query/deliveryTypeAvailableList.query";

export const useDeliveryTypeListToSelectModel = (settlementRef?: string) => {
  const { deliveryTypeAvailablList } =
    useDeliveryTypeAvailableListQuery(settlementRef);

  const deliveryTypeAvailableListToSelect = buildDeliveryTypeOptionsArray(
    deliveryTypeAvailablList,
  );
  return {
    deliveryTypeAvailableListToSelect,
  };
};
