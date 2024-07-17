"use client";
import { Staff } from "@/kernel/domain/staff/staff.type";
import { staffApi } from "../_api/staff.api";
import { useListenStaffListUpdate } from "../_vm/event/useListenStaffListUpdate";

export const useStaffListQuery = () => {
  const { isPending, isFetchedAfterMount, isSuccess, data } =
    staffApi.staff.getList.useQuery<Array<Staff>>();

  useListenStaffListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    staffList: data ?? [],
  };
};

export const useInvalidateStaffList = () => {
  const invalidateUserList = staffApi.useUtils().staff.getList.invalidate;

  return () => invalidateUserList();
};
