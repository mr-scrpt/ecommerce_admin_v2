import { SettlementFormElements } from "@/entities/settlement/_ui/form/settlementFromElements";
import { DeliveryFormUpdate } from "@/features/deliveryUpdate";
import { FC, HTMLAttributes } from "react";

interface OrderUpdateDeliveryItemProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const OrderUpdateDeliveryItem: FC<OrderUpdateDeliveryItemProps> = (
  props,
) => {
  const { orderId } = props;
  return <DeliveryFormUpdate orderId={orderId} />;
};
