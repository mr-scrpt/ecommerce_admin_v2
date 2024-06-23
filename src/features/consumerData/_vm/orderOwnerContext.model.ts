import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { ConsumerDataUI } from "../_domain/types";

// TODO: move this component?
export const orderOwnerContext = createStrictContext<ConsumerDataUI>();

export const useOwnerInfo = () => {
  const { consumerData: owner } = useStrictContext(orderOwnerContext);

  return owner;
};

export const useOrderInfo = () => {
  const { orderListData: orderList } = useStrictContext(orderOwnerContext);
  // const orderListBuild = orderList?.sort((a, b) => a.orderNo - b.orderNo);

  // return orderListBuild;
  return orderList;
};
