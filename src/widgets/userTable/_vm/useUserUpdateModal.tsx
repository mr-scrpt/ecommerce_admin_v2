import { UserFormUpdate } from "@/features/userUpdate";
import { useModalControl } from "@/shared/lib/modal";
import { UserId } from "@/shared/lib/user";

export const useUserUpdateModal = () => {
  const { getModal, closeModal } = useModalControl();

  const openUpdateModal = async (targetId: UserId) => {
    await getModal({
      element: <UserFormUpdate userId={targetId} onSuccess={closeModal} />,
    });
  };

  return { openUpdateModal };
};
