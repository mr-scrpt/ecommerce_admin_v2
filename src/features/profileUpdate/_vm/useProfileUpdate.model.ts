"use client";
import { Profile } from "@/entities/user/profile";
import { useAppSession } from "@/kernel/lib/nextauth";
import { useProfileUpdateMutation } from "../_mutation/useProfileUpdate.mutation";

export const useProfileUpdateModel = () => {
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
