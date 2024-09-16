import { AddressFormElements } from "@/entities/address";
import { useDeliveryQuery } from "@/entities/delivery";
import { FC, useCallback } from "react";
import { DeliveryCommonSectionProps } from "../../../../_domain/ui.type";
import { Button } from "@/shared/ui/button";
import { useAddressAddModal } from "@/kernel/domain/address/address.provider";
import { AddressCreateProps } from "@/kernel/domain/address/ui.type";

export const DeliveryCourierSection: FC<DeliveryCommonSectionProps> = (
  props,
) => {
  const { settlementRef, deliveryId } = props;

  const { delivery } = useDeliveryQuery(deliveryId);
  const { addressAddModal } = useAddressAddModal();

  const openAddressCreateModal = useCallback(
    ({ userId, settlementRef }: AddressCreateProps) => {
      addressAddModal({
        userId,
        settlementRef,
      });
    },
    [addressAddModal],
  );

  // TODO: add ui block
  if (!delivery) return null;
  const { userId } = delivery;

  return (
    <div className="flex flex-row gap-4">
      <AddressFormElements.FieldAddressSelect
        settlementRef={settlementRef}
        userId={userId}
        className="w-full"
      />
      <Button
        onClick={() => openAddressCreateModal({ userId, settlementRef })}
        className="mb-0 mt-auto"
      >
        Add address
      </Button>
    </div>
  );
};
