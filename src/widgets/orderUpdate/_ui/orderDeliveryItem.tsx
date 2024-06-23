import { DeliveryFormUpdate } from "@/features/deliveryUpdate";
import { FC, HTMLAttributes } from "react";

interface OrderDeliveryItemProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const OrderDeliveryItem: FC<OrderDeliveryItemProps> = (props) => {
  const { orderId } = props;
  return <DeliveryFormUpdate orderId={orderId} />;
};
