import { buildOrderStateStatusOptionsArray } from "@/kernel/domain/order/form.schema";
import { useOrderStatusStateListQuery } from "../../_query/orderStatus/useOrderStatusStateList.query";

export const useOrderStatusStateToSelectModel = () => {
  const { orderStatusStateList, isPending, isSuccess, isFetchedAfterMount } =
    useOrderStatusStateListQuery();

  const orderStatusStateListToSelect =
    buildOrderStateStatusOptionsArray(orderStatusStateList);

  return {
    orderStatusStateListToSelect,
    isPending,
    isSuccess,
    isFetchedAfterMount,
  };
};
