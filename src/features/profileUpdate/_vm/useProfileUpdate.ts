import { User } from "@/entities/user/user";
import { useProfileUpdateMutation } from "../_mutation/useProfileUpdate.mutation";
import { useAppSession } from "@/shared/session";

export const useProfileUpdate = () => {
  const { update: updateSession } = useAppSession();

  const onSuccess = async (user: User) => {
    await updateSession({
      user: user,
    });
  };

  const { mutateAsync, isPending } = useProfileUpdateMutation(onSuccess);

  return {
    update: mutateAsync,
    isPending,
  };
};
