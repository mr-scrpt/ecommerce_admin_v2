import { UserFormUpdate } from "@/features/userUpdate";
import { useModalControl } from "@/shared/lib/modal";

export const useUserUpdateModal = () => {
  const { getModal, closeModal } = useModalControl();

  const openUpdateModal = async (targetId: string) => {
    await getModal({
      element: <UserFormUpdate userId={targetId} onSuccess={closeModal} />,
    });
  };

  return { openUpdateModal };
};
