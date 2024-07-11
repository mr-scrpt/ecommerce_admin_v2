import { useOrderWithRelationQuery } from "@/entities/order";
import {
  AddressCreateForm,
  useAddressCreateModal,
  useAddressCreateMutation,
} from "@/features/addressCreate";
import { DeliveryFormUpdate } from "@/features/deliveryUpdate";
import { AddressBase } from "@/kernel/domain/address/address.type";
import { Button } from "@/shared/ui/button";
import { FC, HTMLAttributes, useCallback } from "react";

interface OrderDeliveryItemProps extends HTMLAttributes<HTMLDivElement> {
  orderId: string;
}

export const OrderDeliveryItem: FC<OrderDeliveryItemProps> = (props) => {
  const { orderId } = props;

  const { addressCreate, isPending: isPendingCreate } =
    useAddressCreateMutation();

  const handleAddressCreate = useCallback(
    (addressData: AddressBase) => {
      addressCreate({
        addressData,
      });
    },
    [addressCreate],
  );

  const { order, isSuccess, isPending } = useOrderWithRelationQuery(orderId);
  const { openUpdateModal } = useAddressCreateModal();

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isPending || !isSuccess || !order) {
    return <div>Order not found</div>;
  }
  const { delivery } = order;
  const { userId, settlementRef } = delivery;

  return (
    <>
      {/* TODO: Move to OrderDeliveryUpdate*/}
      {/* <OrderDeliveryUpdate orderId={orderId} settlementRef={settlementRef} /> */}
      <DeliveryFormUpdate
        deliveryId={delivery.id}
        handleAddressCreate={handleAddressCreate}
        addressModal={openUpdateModal}
      />
    </>
  );
};
