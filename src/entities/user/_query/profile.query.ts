import { getProfileAction } from "../_action/getProfile.action";
import { UserId } from "../_domain/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useListenProfileUpdate } from "../_vm/event/useListenProfileUpdate";

const baseKey = "profile";

export const getProfileQuery = (userId: UserId) => ({
  queryKey: [baseKey, "getProfileById", userId],
  queryFn: () => getProfileAction({ userId }),
});
export const useProfileQuery = (userId: UserId) => {
  const query = getProfileQuery(userId);
  const { isPending, isSuccess, data } = useQuery(query);

  useListenProfileUpdate();

  return {
    isPending,
    isSuccess,
    data,
  };
};

export const useInvalidateProfile = () => {
  const queryClient = useQueryClient();

  return (userId: UserId) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getProfileById", userId],
    });
};
