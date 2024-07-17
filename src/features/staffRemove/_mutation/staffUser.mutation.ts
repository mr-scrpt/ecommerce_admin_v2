import { Staff } from "@/kernel/domain/staff/staff.type";
import { staffRemoveApi } from "../_api/staffRemove.api";
import { useEmitUserRemove } from "../_vm/event/useEmitStaffRemove";

export const useStaffRemoveMutation = () => {
  const { userRemoveEvent } = useEmitUserRemove();
  const { isPending, isSuccess, mutateAsync } =
    staffRemoveApi.staffRemove.remove.useMutation<Staff>({
      onSuccess: async ({ id }) => {
        userRemoveEvent(id);
      },
    });
  return {
    userRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
