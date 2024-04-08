import { Profile } from "@/entities/user/profile";
import { useAppSession } from "@/shared/session";
import { useProfileUpdateMutation } from "../_mutation/useProfileUpdate.mutation";

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
