import { buildOrderPaymentStatusOptionsArray } from "@/kernel/domain/order/form.schema";
import { useOrderStatusPaymentListQuery } from "../../_query/orderStatus/useOrderStatusPaymentList.query";

export const useOrderStatusPaymentToSelectModel = () => {
  const { orderStatusPaymentList, isPending, isSuccess, isFetchedAfterMount } =
    useOrderStatusPaymentListQuery();

  const orderStatusPaymentListToSelect = buildOrderPaymentStatusOptionsArray(
    orderStatusPaymentList,
  );
  return {
    orderStatusPaymentListToSelect,
    isPending,
    isSuccess,
    isFetchedAfterMount,
  };
};
