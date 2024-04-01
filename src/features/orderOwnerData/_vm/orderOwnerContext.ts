import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { OrderOwnerDataUI } from "../_domain/types";

export const orderOwnerContext = createStrictContext<OrderOwnerDataUI>();

export const useOwnerInfo = () => {
  const { owner } = useStrictContext(orderOwnerContext);

  return owner;
};

export const useOrderInfo = () => {
  const { orderList } = useStrictContext(orderOwnerContext);
  const orderListBuild = orderList?.sort((a, b) => +a.orderNo - +b.orderNo);

  return orderListBuild;
};
