import { UserEntity } from "@/entities/user/_domain/user.types";
import { useMutation } from "@tanstack/react-query";
import { removeUserComplexibleAction } from "../_action/removeUserComplexible.action";

const baseKey = "userRemoveMutation";

interface IUserRemoveMutation {
  onSuccess: (user: UserEntity) => void;
}

export const useUserRemoveMutation = (props: IUserRemoveMutation) => {
  const { onSuccess } = props;
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey, "complexible"],
    mutationFn: removeUserComplexibleAction,
    async onSuccess({ user }) {
      onSuccess(user);
    },
  });
  return {
    isPending,
    isSuccess,
    mutateAsync,
  };
};
