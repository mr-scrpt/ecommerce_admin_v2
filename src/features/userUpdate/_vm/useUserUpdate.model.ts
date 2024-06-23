import { User } from "@/kernel/domain/user/user.type";
import { useUserUpdateMutation } from "../_mutation/useUserUpdate.mutation";
import { useAppSession } from "@/kernel/lib/nextauth";

export const useUserUpdateModel = () => {
  const { update: updateSession } = useAppSession();

  const onSuccess = async (user: User) => {
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
