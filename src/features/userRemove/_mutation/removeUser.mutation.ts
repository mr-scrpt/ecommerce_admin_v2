import { useMutation } from "@tanstack/react-query";
import { removeUserComplexibleAction } from "../_action/removeUserComplexible.action";
import { useEmitUserRemove } from "../_vm/event/useEmitUserRemove";

const baseKey = "userRemoveMutation";

export const useUserRemoveMutation = () => {
  const { userRemoveEvent } = useEmitUserRemove();
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey, "complexible"],
    mutationFn: removeUserComplexibleAction,
    onSuccess: async ({ user }) => {
      userRemoveEvent(user.id);
    },
  });
  return {
    userRemove: mutateAsync,
    isPending,
    isSuccess,
  };
};
