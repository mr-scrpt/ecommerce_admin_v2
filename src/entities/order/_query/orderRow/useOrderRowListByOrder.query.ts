"use client";
import { orderRowApi } from "../../_api/orderRow.api";
import { OrderRowRelation } from "../../_domain/orderRow/orderRow.types";
import { useListenOrderListUpdate } from "../../_vm/order/event/useListenOrderListUpdate";
import { useListenOrderUpdate } from "../../_vm/order/event/useListenOrderUpdate";

export const useOrderRowListByOrderQuery = (orderId: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    orderRowApi.orderRow.getListByOrder.useQuery<Array<OrderRowRelation>>({
      orderId,
    });

  useListenOrderListUpdate();
  useListenOrderUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    orderRowList: data ?? [],
  };
};

export const useInvalidateOrderRowListByOrder = () => {
  const invalidateOrder =
    orderRowApi.useUtils().orderRow.getListByOrder.invalidate;

  return (orderId: string) => invalidateOrder({ orderId });
};
