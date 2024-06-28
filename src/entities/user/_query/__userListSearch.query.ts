"use client";
import { useEffect, useState } from "react";
import { userApi } from "../_api/user.api";
import { useListenUserListUpdate } from "../_vm/event/useListenUserListUpdate";
import { User } from "@/kernel/domain/user/user.type";

export const useUserListSearchQuery = () => {
  const [q, setQ] = useState<string>("");

  const invalidate = useInvalidateUserListSearch(q);

  useEffect(() => {
    if (q) {
      invalidate();
    }
  }, [q]);

  // const query = getUserListSearchQuery(q);

  const { isPending, isFetchedAfterMount, isSuccess, data } =
    userApi.user.search.useQuery<Array<User>>({ q });

  useListenUserListUpdate();

  return {
    toSearch: (q: string) => setQ(q),
    searchValue: q,
    isPending,
    isSuccess,
    isFetchedAfterMount,
    data: data ?? [],
  };
};

export const useInvalidateUserListSearch = (q: string) => {
  const invalidateUserSearch = userApi.useUtils().user.search.invalidate;
  return () => invalidateUserSearch({ q });
};
