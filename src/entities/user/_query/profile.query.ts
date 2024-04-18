import { getProfileAction } from "../_action/getProfile.action";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useListenProfileUpdate } from "../_vm/event/useListenProfileUpdate";
import { UserId } from "@/shared/lib/user";
import { profileBaseQueryKey } from "../_domain/profile.types";

export const getProfileQuery = (profileId: string) =>
  queryOptions({
    queryKey: [profileBaseQueryKey, "getProfile", profileId],
    queryFn: () => getProfileAction({ profileId: profileId }),
  });

export const useProfileQuery = (userId: UserId) => {
  const query = getProfileQuery(userId);
  const { isPending, isSuccess, isFetchedAfterMount, data } = useQuery(query);

  useListenProfileUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    data,
  };
};

export const useInvalidateProfile = () => {
  const queryClient = useQueryClient();

  return (userId: UserId) =>
    queryClient.invalidateQueries({
      queryKey: [profileBaseQueryKey, "getProfile", userId],
    });
};
