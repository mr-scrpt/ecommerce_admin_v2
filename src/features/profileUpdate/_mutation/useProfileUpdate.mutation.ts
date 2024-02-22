import { Profile } from "@/entities/user/profile";
import { UserId } from "@/shared/lib/user";
import { useMutation } from "@tanstack/react-query";
import { useEmitProfileUpdate } from "..";
import { updateProfileAction } from "../_action/profileUpdate.action";

export const useProfileUpdateMutation = (
  onSuccess: (profile: Profile) => void,
) => {
  const { profileUpdateEvent } = useEmitProfileUpdate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfileAction,
    onSuccess: async ({ profile }, { userId }) => {
      onSuccess(profile);
      profileUpdateEvent(userId);
    },
  });
  return {
    mutateAsync,
    isPending,
  };
};
