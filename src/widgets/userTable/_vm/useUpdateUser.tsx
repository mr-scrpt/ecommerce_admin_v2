import { UserId } from "@/entities/user/user";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useGetModal } from "@/shared/lib/modal";
import { ReactNode } from "react";

export const useUpdateUser = () => {
  const getModal = useGetModal();

  // const { isPending, mutate } = useUpdateRemoveQuery();

  const openUpdateModal = async (element: ReactNode) => {
    const modal = await getModal({ element });

    // if (!confirmation) return;
    //
    // mutate(userId);
  };

  return { openUpdateModal };
};
