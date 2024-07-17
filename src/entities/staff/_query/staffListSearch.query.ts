"use client";
import { Staff } from "@/kernel/domain/staff/staff.type";
import { useEffect, useState } from "react";
import { staffApi } from "../_api/staff.api";
import { useListenStaffUpdate } from "../_vm/event/useListenStaffUpdate";

export const useStaffListSearchQuery = () => {
  const [q, setQ] = useState<string>("");

  const invalidate = useInvalidateUserListSearch(q);

  useEffect(() => {
    if (q) {
      invalidate();
    }
  }, [q]);

  const { isPending, isFetchedAfterMount, isSuccess, data } =
    staffApi.staff.search.useQuery<Array<Staff>>({ q });

  useListenStaffUpdate();

  return {
    toSearch: (q: string) => setQ(q),
    searchValue: q,
    isPending,
    isSuccess,
    isFetchedAfterMount,
    staffList: data ?? [],
  };
};

export const useInvalidateUserListSearch = (q: string) => {
  const invalidateUserSearch = staffApi.useUtils().staff.search.invalidate;
  return () => invalidateUserSearch({ q });
};
