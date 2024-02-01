import { getProfileAction } from "../_action/getProfile.action";
import { UserId } from "../_domain/types";
import { useQueryClient } from "@tanstack/react-query";

const baseKey = "profile";

export const getProfileQuery = (userId: UserId) => ({
  queryKey: [baseKey, "getProfileById", userId],
  queryFn: () => getProfileAction({ userId }),
});

export const useInvalidateProfile = () => {
  const queryClient = useQueryClient();

  return (userId: UserId) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getProfileById", userId],
    });
};
