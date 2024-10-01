import { useModalControl } from "@/shared/lib/modal";
import { useCallback } from "react";
import { ConsumerCreateForm } from "../_ui/consumerCreateForm";

export const useConsumerCreateModal = () => {
  const { getModal, closeModal } = useModalControl();

  const openConsumerCreateModal = useCallback(async () => {
    await getModal({
      element: <ConsumerCreateForm onSuccess={closeModal} />,
    });
  }, [getModal, closeModal]);

  return { openConsumerCreateModal };
};
