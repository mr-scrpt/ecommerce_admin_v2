import { Staff } from "@/kernel/domain/staff/staff.type";
import { staffUpdateApi } from "../_api/staffUpdate.api";
import { useEmitStaffUpdate } from "../_vm/event/useEmitStaffUpdate";

interface IStaffUpdateMutation {
  onSuccess: (staff: Staff) => void;
}

export const useStaffUpdateMutation = (props: IStaffUpdateMutation) => {
  const { onSuccess } = props;
  const { userUpdateEvent } = useEmitStaffUpdate();

  const { mutateAsync, isPending } =
    staffUpdateApi.staffUpdate.update.useMutation({
      onSuccess: async (staff) => {
        onSuccess(staff);
        userUpdateEvent(staff.id);
      },
    });
  return {
    mutateAsync,
    isPending,
  };
};
