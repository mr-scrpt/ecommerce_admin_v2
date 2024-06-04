"use client";
import { profileApi } from "../_api/profile.api";
import { Profile } from "../_domain/profile.types";
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
