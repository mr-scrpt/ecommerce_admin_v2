import { useInvalidateProfile } from "@/entities/user/profile";
import { useAppSession } from "@/entities/user/session";
import { useMutation } from "@tanstack/react-query";
import { updateProfileAction } from "../_action/profileUpdate.action";

export const useUpdateProfile = () => {
  console.log("output_log:  =>>>in update");
  const { update: updateSession } = useAppSession();
  const invalidateProfile = useInvalidateProfile();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfileAction,
    async onSuccess({ profile }, { userId }) {
      await invalidateProfile(userId);
      await updateSession({
        user: profile,
      });
    },
  });

  return {
    update: mutateAsync,
    isPending,
  };
};