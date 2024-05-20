import { User } from "@/entities/user/user";
import { useUserUpdateMutation } from "../_mutation/useUserUpdate.mutation";
import { useAppSession } from "@/kernel/lib/nextauth";

export const useUserUpdate = () => {
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
