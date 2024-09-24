import { FC, HTMLAttributes } from "react";
import { OrderUpdateLayout } from "@/features/orderUpdate";

interface OrderUpdateStatusItemProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const OrderUpdateStatusItem: FC<OrderUpdateStatusItemProps> = (
  props,
) => {
  const { orderId } = props;
  return <OrderUpdateLayout orderId={orderId} />;
};
