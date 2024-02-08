// "use client";
import { useAppSession } from "@/entities/user/session";
import { User, UserId, useInvalidateUser } from "@/entities/user/user";
import { useUserUpdateMutation } from "../_mutation/useUserUpdate.mutation";
import { useEmitUserUpdate } from "./event/useUserUpdateEmit";

export const useUserUpdate = () => {
  const { update: updateSession } = useAppSession();
  const invalidateUser = useInvalidateUser();
  const { userUpdateEvent } = useEmitUserUpdate();

  const onSuccess = async (user: User, userId: UserId) => {
    await invalidateUser(userId);
    await updateSession({
      user: user,
    });
    userUpdateEvent();
  };

  const { mutateAsync, isPending } = useUserUpdateMutation(onSuccess);

  return {
    userUpdateEvent,
    update: mutateAsync,
    isPending,
  };
};
