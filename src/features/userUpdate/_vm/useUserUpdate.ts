// "use client";
import { UserEntity } from "@/entities/user/_domain/types";
import { useAppSession } from "@/entities/user/session";
import { useInvalidateUser } from "@/entities/user/user";
import { useUserUpdateMutation } from "../_mutation/useUserUpdate.mutation";
import { useEmitUserUpdate } from "./event/useEmitUserUpdate";

export const useUserUpdate = () => {
  const { update: updateSession } = useAppSession();

  // const invalidateUser = useInvalidateUser();

  const { userUpdateEvent } = useEmitUserUpdate();

  const onSuccess = async (user: UserEntity) => {
    const { id } = user;
    // await invalidateUser(id);
    await updateSession({
      user,
    });
    userUpdateEvent(id);
  };

  const { mutateAsync, isPending } = useUserUpdateMutation({ onSuccess });

  return {
    // userUpdateEvent,
    userUpdate: mutateAsync,
    isPending,
  };
};
