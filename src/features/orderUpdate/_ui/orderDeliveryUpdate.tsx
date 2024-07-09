import { useOrderWithRelationQuery } from "@/entities/order";
import { DeliveryFormUpdate } from "@/features/deliveryUpdate";
import { FC, HTMLAttributes } from "react";

interface OrderDeliveryUpdateProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
  // settlementRef: string;
}

export const OrderDeliveryUpdate: FC<OrderDeliveryUpdateProps> = (props) => {
  // const { orderId, settlementRef } = props;
  const { orderId } = props;
  const { order, isSuccess, isPending } = useOrderWithRelationQuery(orderId);
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isPending || !isSuccess || !order) {
    return <div>Order not found</div>;
  }
  const { delivery } = order;
  return (
    <DeliveryFormUpdate
      deliveryId={delivery.id}
      // settlementRef={delivery.settlementRef}
    />
  );
};
