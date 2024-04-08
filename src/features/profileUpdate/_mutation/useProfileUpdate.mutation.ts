import { Profile } from "@/entities/user/profile";
import { useMutation } from "@tanstack/react-query";
import { useEmitProfileUpdate } from "..";
import { updateProfileAction } from "../_action/profileUpdate.action";

export const useProfileUpdateMutation = (
  onSuccess: (profile: Profile) => void,
) => {
  const { profileUpdateEvent } = useEmitProfileUpdate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfileAction,
    onSuccess: async ({ profile }, { profileId }) => {
      onSuccess(profile);
      profileUpdateEvent(profileId);
    },
  });
  return {
    mutateAsync,
    isPending,
  };
};
