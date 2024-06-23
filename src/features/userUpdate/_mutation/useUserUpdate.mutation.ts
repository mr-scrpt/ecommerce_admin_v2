import { useMutation } from "@tanstack/react-query";
import { updateUserAction } from "../_action/userUpdate.action";
import { useEmitUserUpdate } from "../_vm/event/useEmitUserUpdate";
import { User } from "@/kernel/domain/user/user.type";

const baseKey = "userUpdateMutation";

interface IUserUpdateMutation {
  onSuccess: (user: User) => void;
}

export const useUserUpdateMutation = (props: IUserUpdateMutation) => {
  const { onSuccess } = props;
  const { userUpdateEvent } = useEmitUserUpdate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [baseKey],
    mutationFn: updateUserAction,
    onSuccess: async ({ user }) => {
      onSuccess(user);
      userUpdateEvent(user.id);
    },
  });
  return {
    mutateAsync,
    isPending,
  };
};
