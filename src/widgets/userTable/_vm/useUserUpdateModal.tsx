import { UserId } from "@/entities/user/user";
import { UserFormUpdate } from "@/features/userUpdate";
import { useGetModal } from "@/shared/lib/modal";
import { ReactNode } from "react";

export const useUserUpdateModal = () => {
  const getModal = useGetModal();

  // const { isPending, mutate } = useUpdateRemoveQuery();

  const openUpdateModal = async (targetId: UserId) => {
    const modal = await getModal({
      element: <UserFormUpdate userId={targetId} />,
      // title: "Update user",
      // description: "update user data",
    });

    // if (!confirmation) return;
    //
    // mutate(userId);
  };

  return { openUpdateModal };
};
