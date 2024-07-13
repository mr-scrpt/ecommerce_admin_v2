import { AddressCreateForm } from "@/features/addressCreate";
import { AddressCreateProps } from "@/kernel/domain/address/ui.type";
import { useModalControl } from "@/shared/lib/modal";
import { useCallback } from "react";

export const useAddressCreateModal = () => {
  const { getModal, closeModal } = useModalControl();

  const openAddressCreateModal = useCallback(
    async ({ userId, settlementRef }: AddressCreateProps) => {
      await getModal({
        element: (
          <AddressCreateForm
            userId={userId}
            settlementRef={settlementRef}
            onSuccess={closeModal}
          />
        ),
      });
    },
    [getModal, closeModal],
  );

  return { openAddressCreateModal };
};
