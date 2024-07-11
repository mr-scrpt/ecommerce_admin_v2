import { AddressCreateForm } from "@/features/addressCreate";
import { AddressCreateProps } from "@/kernel/domain/address/ui.type";
import { useModalControl } from "@/shared/lib/modal";

export const useAddressCreateModal = () => {
  const { getModal, closeModal } = useModalControl();

  const openUpdateModal = async ({
    userId,
    settlementRef,
  }: AddressCreateProps) => {
    await getModal({
      element: (
        <AddressCreateForm
          userId={userId}
          settlementRef={settlementRef}
          onSuccess={closeModal}
        />
      ),
    });
  };

  return { openUpdateModal };
};
