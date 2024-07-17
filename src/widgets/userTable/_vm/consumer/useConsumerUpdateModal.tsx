import { ConsumerFormUpdate } from "@/features/consumerUpdate";
import { useModalControl } from "@/shared/lib/modal";

export const useConsumerUpdateModal = () => {
  const { getModal, closeModal } = useModalControl();

  const openUpdateModal = async (consumerId: string) => {
    await getModal({
      element: (
        <ConsumerFormUpdate consumerId={consumerId} onSuccess={closeModal} />
      ),
    });
  };

  return { openUpdateModal };
};
