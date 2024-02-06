import { useAppSession } from "@/entities/user/session";
import { User, UserId, useInvalidateUser } from "@/entities/user/user";
import { useUserUpdateMutation } from "../_mutation/useUserUpdate.mutation";

export const useUserUpdate = () => {
  const { update: updateSession } = useAppSession();
  const invalidateUser = useInvalidateUser();

  const onSuccess = async (user: User, userId: UserId) => {
    await invalidateUser(userId);
    await updateSession({
      user: user,
    });
  };

  const { mutateAsync, isPending } = useUserUpdateMutation(onSuccess);

  return {
    update: mutateAsync,
    isPending,
  };
};
