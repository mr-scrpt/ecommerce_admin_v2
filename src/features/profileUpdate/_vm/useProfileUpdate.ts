import { User, useInvalidateUser } from "@/entities/user/user";
import { useAppSession } from "@/entities/user/session";
import { UserId } from "@/entities/user/user";
import { useProfileUpdateMutation } from "../_mutation/useProfileUpdate.mutation";
import { useEmitProfileUpdate } from "./event/useEmitProfileUpdate";

export const useProfileUpdate = () => {
  const { update: updateSession } = useAppSession();
  const invalidateUser = useInvalidateUser();
  const { profileUpdateEvent } = useEmitProfileUpdate();

  const onSuccess = async (user: User, userId: UserId) => {
    await invalidateUser(userId);
    await updateSession({
      user: user,
    });
    profileUpdateEvent(userId);
  };

  const { mutateAsync, isPending } = useProfileUpdateMutation(onSuccess);

  return {
    update: mutateAsync,
    isPending,
  };
};
