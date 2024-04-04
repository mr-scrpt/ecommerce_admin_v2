import { useMutation } from "@tanstack/react-query";
import { createUserAction } from "../_action/userCreate.action";
import { useEmitUserUpdate } from "../_vm/event/useEmitUserUpdate";

const baseKey = "userCreateMutation";

export const useUserCreateMutation = () => {
  const { userUpdateEvent } = useEmitUserUpdate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [baseKey],
    mutationFn: createUserAction,
    onSuccess: async ({ user }) => {
      userUpdateEvent(user.id);
    },
  });
  return {
    createUser: mutateAsync,
    isPending,
  };
};
