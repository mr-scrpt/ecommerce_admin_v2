// "use client";
import { Profile } from "@/entities/user/profile";
import { useEmitProfileUpdate } from "..";
import { profileUpdateApi } from "../_api/profileUpdate.api";

export const useProfileUpdateMutation = (
  onSuccess: (profile: Profile) => void,
) => {
  const { profileUpdateEvent } = useEmitProfileUpdate();

  const { mutateAsync, isPending } =
    profileUpdateApi.profileUpdate.update.useMutation({
      onSuccess: async (profile) => {
        console.log("output_log: success =>>>", profile);
        onSuccess(profile);
        profileUpdateEvent(profile.id);
      },
    });
  return {
    mutateAsync,
    isPending,
  };
};
