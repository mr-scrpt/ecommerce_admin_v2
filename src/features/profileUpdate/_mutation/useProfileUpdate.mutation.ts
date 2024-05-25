import { Profile } from "@/entities/user/profile";
import { useMutation } from "@tanstack/react-query";
import { useEmitProfileUpdate } from "..";
import { updateProfileAction } from "../_action/profileUpdate.action";
import { profileUpdateApi } from "../_api/profileUpdate.api";

export const useProfileUpdateMutation = (
  onSuccess: (profile: Profile) => void,
) => {
  const { profileUpdateEvent } = useEmitProfileUpdate();

  const { mutateAsync, isPending } =
    profileUpdateApi.profileUpdate.update.useMutation({
      onSuccess: async (profile) => {
        onSuccess(profile);
        profileUpdateEvent(profile.id);
      },
    });
  return {
    mutateAsync,
    isPending,
  };
};
