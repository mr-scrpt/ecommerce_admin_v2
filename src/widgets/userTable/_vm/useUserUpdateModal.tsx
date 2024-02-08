import { UserId } from "@/entities/user/user";
import { UserFormUpdate } from "@/features/userUpdate";
import { useModalControl } from "@/shared/lib/modal";

export const useUserUpdateModal = () => {
  const { getModal, closeModal } = useModalControl();

  const openUpdateModal = async (targetId: UserId) => {
    await getModal({
      element: <UserFormUpdate userId={targetId} onSuccess={closeModal} />,
    });
  };

  return { openUpdateModal };
};
