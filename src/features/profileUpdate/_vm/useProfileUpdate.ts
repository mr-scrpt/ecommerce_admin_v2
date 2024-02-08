import { User, useInvalidateUser } from "@/entities/user/user";
import { useAppSession } from "@/entities/user/session";
import { UserId } from "@/entities/user/user";
import { useProfileUpdateMutation } from "../_mutation/useProfileUpdate.mutation";

export const useProfileUpdate = () => {
  const { update: updateSession } = useAppSession();
  const invalidateUser = useInvalidateUser();

  const onSuccess = async (user: User, userId: UserId) => {
    await invalidateUser(userId);
    await updateSession({
      user: user,
    });
    userUpdateEvent();
  };

  const { mutateAsync, isPending } = useProfileUpdateMutation(onSuccess);

  return {
    update: mutateAsync,
    isPending,
  };
};
