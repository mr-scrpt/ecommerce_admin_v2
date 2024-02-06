import { UserId } from "@/entities/user/user";
import { useMutation } from "@tanstack/react-query";
import { removeUserComplexibleAction } from "../_action/removeUserComplexible.action";

const baseKey = "userRemoveComplexible";

export const useUserRemoveQuery = () => {
  const { isPending, isSuccess, mutateAsync } = useMutation({
    mutationKey: [baseKey, "removeUserComplexible"],
    mutationFn: (userId: UserId) => removeUserComplexibleAction({ userId }),
  });
  return {
    isPending,
    isSuccess,
    mutateAsync,
  };
};
