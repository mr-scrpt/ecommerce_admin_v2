"use client";
import { Profile } from "@/kernel/domain/profile/profile.type";
import { profileApi } from "../_api/profile.api";
import { useListenProfileUpdate } from "../_vm/event/useListenProfileUpdate";

export const useProfileQuery = (userId: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    profileApi.profile.get.useQuery<Profile>({ id: userId });

  useListenProfileUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    data,
  };
};

export const useInvalidateProfile = () => {
  const invalidateProfile = profileApi.useUtils().profile.get.invalidate;

  return (userId: string) => invalidateProfile({ id: userId });
};
