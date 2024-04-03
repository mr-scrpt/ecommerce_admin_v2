import { UserEntity } from "@/entities/user/_domain/user.types";
import { useUserUpdateMutation } from "../_mutation/useUserUpdate.mutation";
import { useAppSession } from "@/shared/session";

export const useUserUpdate = () => {
  const { update: updateSession } = useAppSession();

  const onSuccess = async (user: UserEntity) => {
    await updateSession({
      user,
    });
  };

  const { mutateAsync, isPending } = useUserUpdateMutation({ onSuccess });

  return {
    userUpdate: mutateAsync,
    isPending,
  };
};
