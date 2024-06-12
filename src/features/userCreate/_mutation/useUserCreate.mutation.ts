import { useEmitUserUpdate } from "../_vm/event/useEmitUserUpdate";
import { userCreateApi } from "../_api/userCreate.api";

export const useUserCreateMutation = () => {
  const { userUpdateEvent } = useEmitUserUpdate();

  const { mutateAsync, isPending } =
    userCreateApi.userCreate.create.useMutation({
      onSuccess: async ({ id }) => {
        userUpdateEvent(id);
      },
    });
  return {
    userCreate: mutateAsync,
    isPending,
  };
};
