import { useOrderWithRelationQuery } from "@/entities/order";
import { useAddressCreateModal } from "@/features/addressCreate";
import { DeliveryFormUpdate } from "@/features/deliveryUpdate";
import { useReceiverCreateModal } from "@/features/receiverCreate";
import { FC, HTMLAttributes } from "react";

interface OrderDeliveryItemProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const OrderDeliveryItem: FC<OrderDeliveryItemProps> = (props) => {
  const { orderId } = props;

  const { order, isSuccess, isPending } = useOrderWithRelationQuery(orderId);

  const { openAddressCreateModal } = useAddressCreateModal();
  const { openReceiverCreateModal } = useReceiverCreateModal();

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
      addressAddModal={openAddressCreateModal}
      receiverAddModal={openReceiverCreateModal}
    />
  );
};
