import { useAppSession } from "@/entities/user/session";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  const { update: updateSession } = useAppSession();
  // const invalidateProfile = useInvalidateProfile();

  // const { mutateAsync, isPending } = useMutation({
  //   mutationFn: updateProfileAction,
  //   async onSuccess({ profile }, { userId }) {
  //     await invalidateProfile(userId);
  //     await updateSession({
  //       user: profile,
  //     });
  //   },
  // });
  //
  // return {
  //   update: mutateAsync,
  //   isPending,
  // };
};
