"use client";
import { RoutePathEnum } from "@/shared/config/routing.config";
import { FC, HTMLAttributes } from "react";
import { OrderUpdateDeliveryItem } from "./delivery/orderUpdateDeliveryItem";
import { OrderUpdateReceiverItem } from "./receiver/orderUpdateReceiverItem";
import { OrderUpdateProductItem } from "./products/orderUpdateProductItem";
import { OrderUpdateLayout } from "./orderUpdateLayout";
import { OrderUpdateConsumerItem } from "./consumer/orderUpdateConsumerItem";

interface OrderUpdateProps extends HTMLAttributes<HTMLDivElement> {
  callbackUrl: RoutePathEnum;
  orderId: string;
}

export const OrderUpdate: FC<OrderUpdateProps> = (props) => {
  const { callbackUrl, orderId } = props;
  return (
    <OrderUpdateLayout
      slotGeneral={<OrderUpdateProductItem orderId={orderId} />}
      slotDelivery={<OrderUpdateDeliveryItem orderId={orderId} />}
      slotReceiver={<OrderUpdateReceiverItem orderId={orderId} />}
      slotConsumer={<OrderUpdateConsumerItem orderId={orderId} />}
    />
  );
};
