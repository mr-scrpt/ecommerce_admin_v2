import { StaffFormUpdate } from "@/features/staffUpdate";
import { useModalControl } from "@/shared/lib/modal";

export const useStaffUpdateModal = () => {
  const { getModal, closeModal } = useModalControl();

  const openUpdateModal = async (staffId: string) => {
    await getModal({
      element: <StaffFormUpdate staffId={staffId} onSuccess={closeModal} />,
    });
  };

  return { openUpdateModal };
};
