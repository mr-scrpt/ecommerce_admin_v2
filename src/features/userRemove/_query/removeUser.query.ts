import { useMutation, useQuery } from "@tanstack/react-query";
import { removeUserAction } from "../_action/removeUserComplexible.action";
import { UserId } from "@/entities/user/user";

const baseKey = "userRemove";
export const useUserRemoveQuery = () => {
  const { isPending, mutate } = useMutation({
    mutationKey: [baseKey, "removeUser"],
    mutationFn: (userId: UserId) => removeUserAction({ userId }),
  });
  return {
    isPending,
    mutate,
  };
};
