import { useDeliveryWithRelationByOrderIdQuery } from "@/entities/delivery";
import { DeliveryFormUpdate } from "@/features/deliveryUpdate";
import { FC, HTMLAttributes } from "react";

interface OrderUpdateDeliveryItemProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const OrderUpdateDeliveryItem: FC<OrderUpdateDeliveryItemProps> = (
  props,
) => {
  const { orderId } = props;
  const { isPending, delivery, isFetchedAfterMount } =
    useDeliveryWithRelationByOrderIdQuery(orderId);

  if (!delivery) return null;
  // if (!isPending && !isFetchedAfterMount) return null;
  return <DeliveryFormUpdate deliveryId={delivery.id} />;
};
