import { UserEntity } from "@/entities/user/_domain/user.types";
import { useAppSession } from "@/entities/user/session";
import { useUserUpdateMutation } from "../_mutation/useUserUpdate.mutation";

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
