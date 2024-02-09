import { User, UserId } from "@/entities/user/user";
import { useMutation } from "@tanstack/react-query";
import { updateUserAction } from "../_action/userUpdate.action";

// const baseKey = "userUpdate";
export const useUserUpdateMutation = (
  onSuccess: (user: User, userId: UserId) => void,
) => {
  const { mutateAsync, isPending } = useMutation({
    // mutationKey: [baseKey, "removeUserTableList"],
    mutationFn: updateUserAction,
    async onSuccess({ user }, { userId }) {
      onSuccess(user, userId);
    },
  });
  return {
    mutateAsync,
    isPending,
  };
};
