"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useListenUserListUpdate } from "../_vm/event/useListenUserListUpdate";
import { userBaseQueryKey } from "../_domain/user.types";
import { getUserStrictListSearchAction } from "../_action/getUserListSearch.action";

export const getUserListSearchQuery = (q: string) =>
  queryOptions({
    queryKey: [userBaseQueryKey, "getUserListSearch", q],
    queryFn: () => {
      return getUserStrictListSearchAction({ q });
    },
    // staleTime: 1000,
  });

export const useUserListSearchQuery = () => {
  const [q, setQ] = useState<string>("");

  const invalidate = useInvalidateUserList(q);

  useEffect(() => {
    if (q) {
      invalidate();
    }
  }, [q]);

  const query = getUserListSearchQuery(q);

  const { isPending, isFetchedAfterMount, isSuccess, data } = useQuery(query);

  useListenUserListUpdate();

  return {
    toSearch: (q: string) => setQ(q),
    searchValue: q,
    isPending,
    isSuccess,
    isFetchedAfterMount,
    data: data ? data.userList : [],
  };
};

export const useInvalidateUserList = (q: string) => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [userBaseQueryKey, "getUserListSearch", q],
    });
};
