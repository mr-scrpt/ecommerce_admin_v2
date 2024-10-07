import { useOrderWithRelationModel } from "@/entities/order";
import { OrderReceiverUpdateFormValues } from "../_domain/form.schema";
import { buildReceiverOptionsArray } from "@/kernel/domain/receiver/form.schema";

export const useOrderReceiverUpdateValues = (orderId: string) => {
  const {
    order,
    isFetchedAfterMountOrder,
    isAppearancePendingOrder,
    isSuccessOrder,
  } = useOrderWithRelationModel(orderId);

  const orderReceiverUpdateValues: OrderReceiverUpdateFormValues = {
    orderReceiverList: buildReceiverOptionsArray([order?.receiver]),
  };

  return {
    orderReceiverUpdateValues,
    isFetchedAfterMountOrder,
    isAppearancePendingOrder,
    isSuccessOrder,
  };
};
