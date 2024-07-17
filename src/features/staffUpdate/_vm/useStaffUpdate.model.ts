import { Staff } from "@/kernel/domain/staff/staff.type";
import { useAppSession } from "@/kernel/lib/nextauth";
import { useStaffUpdateMutation } from "../_mutation/useUserUpdate.mutation";

export const useStaffUpdateModel = () => {
  const { update: updateSession } = useAppSession();

  const onSuccess = async (staff: Staff) => {
    await updateSession({
      staff,
    });
  };

  const { mutateAsync, isPending } = useStaffUpdateMutation({ onSuccess });

  return {
    staffUpdate: mutateAsync,
    isPending,
  };
};
