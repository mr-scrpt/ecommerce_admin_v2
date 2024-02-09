import { UserEntity } from "@/entities/user/_domain/types";
import { useMutation } from "@tanstack/react-query";
import { updateUserAction } from "../_action/userUpdate.action";

const baseKey = "userUpdateMutation";

interface IUserUpdateMutation {
  onSuccess: (user: UserEntity) => void;
}
export const useUserUpdateMutation = (props: IUserUpdateMutation) => {
  const { onSuccess } = props;

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [baseKey],
    mutationFn: updateUserAction,
    // async onSuccess({ user }, { userId }) {
    //   onSuccess(user, userId);
    // },
    async onSuccess({ user }) {
      onSuccess(user);
    },
  });
  return {
    mutateAsync,
    isPending,
  };
};
