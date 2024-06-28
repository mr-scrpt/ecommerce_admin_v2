import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { ConsumerRelationWithStringDateUI } from "../_domain/ui.type";

// TODO: move this component?
export const orderOwnerContext =
  createStrictContext<ConsumerRelationWithStringDateUI>();

export const useOwnerInfo = () => {
  const { consumer } = useStrictContext(orderOwnerContext);

  return consumer;
};

export const useOrderInfo = () => {
  const { orderList } = useStrictContext(orderOwnerContext);
  return orderList;
};
