import { useEmitUserUpdate } from "../_vm/event/useEmitUserUpdate";
import { User } from "@/kernel/domain/user/user.type";
import { userUpdateApi } from "../_api/userUpdate.api";

interface IUserUpdateMutation {
  onSuccess: (user: User) => void;
}

export const useUserUpdateMutation = (props: IUserUpdateMutation) => {
  const { onSuccess } = props;
  const { userUpdateEvent } = useEmitUserUpdate();

  const { mutateAsync, isPending } =
    userUpdateApi.userUpdate.update.useMutation({
      onSuccess: async (user) => {
        onSuccess(user);
        userUpdateEvent(user.id);
      },
    });
  return {
    mutateAsync,
    isPending,
  };
};
