import { ReceiverCreateForm } from "@/features/receiverCreate";
import { ReceiverCreateProps } from "@/kernel/domain/receiver/ui.type";
import { useModalControl } from "@/shared/lib/modal";
import { useCallback } from "react";

export const useReceiverCreateModal = () => {
  const { getModal, closeModal } = useModalControl();

  const openReceiverCreateModal = useCallback(
    async ({ userId }: ReceiverCreateProps) => {
      await getModal({
        element: <ReceiverCreateForm userId={userId} onSuccess={closeModal} />,
      });
    },
    [getModal, closeModal],
  );

  return { openReceiverCreateModal };
};
