import { OrderStatusStateDefaultSelectOption } from "@/kernel/domain/order/form.schema";
import { useMemo } from "react";
import { useOrderStatusStateListQuery } from "../../_query/orderStatus/useOrderStatusStateList.query";

export const useOrderStatusStateToSelectModel = () => {
  const { orderStatusStateList, isPending, isSuccess, isFetchedAfterMount } =
    useOrderStatusStateListQuery();

  const orderStatusStateListToSelect: Array<OrderStatusStateDefaultSelectOption> =
    useMemo(
      () =>
        orderStatusStateList.map((item) => ({
          value: item.id,
          label: item.status,
        })),
      [orderStatusStateList],
    );
  return {
    orderStatusStateListToSelect,
    isPending,
    isSuccess,
    isFetchedAfterMount,
  };
};
