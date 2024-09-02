"use client";

import { OrderRowList } from "@/entities/order";
import { OrderRemoveButton } from "@/features/orderRowRemove";
import { OrderRowCounter } from "@/features/orderRowUpdate";
import { FC, HTMLAttributes } from "react";


interface OrderRowListWithActionsProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const OrderRowListWithActions: FC<OrderRowListWithActionsProps> = (
  props,
) => {
  return (
    <OrderRowList
      orderId={props.orderId}
      SlotFirst={OrderRowCounter}
      SlotSecond={OrderRemoveButton}
    />
  );
};
