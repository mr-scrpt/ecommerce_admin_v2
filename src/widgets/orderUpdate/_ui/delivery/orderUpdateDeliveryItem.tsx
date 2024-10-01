import { useDeliveryWithRelationByOrderIdQuery } from "@/entities/delivery";
import { useAddressCreateModal } from "@/features/addressCreate";
import { DeliveryFormUpdate } from "@/features/deliveryUpdate";
import { AddressCreateModalProvider } from "@/kernel/domain/address/address.provider";
import { FC, HTMLAttributes, memo } from "react";

interface OrderUpdateDeliveryItemProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const OrderUpdateDeliveryItem: FC<OrderUpdateDeliveryItemProps> = memo(
  (props) => {
    const { orderId } = props;

    const { isPending, delivery, isFetchedAfterMount } =
      useDeliveryWithRelationByOrderIdQuery(orderId);

    const { openAddressCreateModal } = useAddressCreateModal();

    // TODO: Add ui component
    if (!delivery) return null;
    const { id, userId } = delivery;

    return (
      <AddressCreateModalProvider addressCreateModal={openAddressCreateModal}>
        <DeliveryFormUpdate deliveryId={id} userId={userId} />
      </AddressCreateModalProvider>
    );
  },
);
