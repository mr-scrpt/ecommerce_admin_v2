import { useMutation } from "@tanstack/react-query";
import { updateProfileAction } from "../_action/profileUpdate.action";
import { Profile } from "@/entities/user/profile";
import { UserId } from "@/shared/lib/user";

export const useProfileUpdateMutation = (
  onSuccess: (profile: Profile, userId: UserId) => void,
) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfileAction,
    async onSuccess({ profile }, { userId }) {
      onSuccess(profile, userId);
    },
  });
  return {
    mutateAsync,
    isPending,
  };
};
