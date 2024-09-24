import { useConsumerByOrderModel } from "@/entities/consumer";
import { ReceiverFormElements } from "@/entities/receiver";
import { OrderReceiverUpdateForm } from "@/features/orderReceiverUpdate";
import { FC, HTMLAttributes } from "react";

interface OrderUpdateReceiverItemProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const OrderUpdateReceiverItem: FC<OrderUpdateReceiverItemProps> = (
  props,
) => {
  const { orderId } = props;
  // const { receiverList } = useReceiverListByOrder(orderId);
  const { consumer } = useConsumerByOrderModel(orderId);

  if (!consumer) return null;
  const { id: userId } = consumer;

  return <OrderReceiverUpdateForm userId={userId} orderId={orderId} />;
};
