import { User } from "@/entities/user/user";
import { useProfileUpdateMutation } from "../_mutation/useProfileUpdate.mutation";
import { useAppSession } from "@/shared/session";
import { Profile } from "@/entities/user/profile";

export const useProfileUpdate = () => {
  const { update: updateSession } = useAppSession();

  const onSuccess = async (profile: Profile) => {
    await updateSession({
      profile,
    });
  };

  const { mutateAsync, isPending } = useProfileUpdateMutation(onSuccess);

  return {
    update: mutateAsync,
    isPending,
  };
};
