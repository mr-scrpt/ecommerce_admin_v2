"use client";
import { Staff } from "@/kernel/domain/staff/staff.type";
import { staffApi } from "../_api/staff.api";
import { useListenStaffUpdate } from "../_vm/event/useListenStaffUpdate";

export const useStaffQuery = (id: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    staffApi.staff.get.useQuery<Staff>({ id });

  useListenStaffUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    staff: data,
  };
};

export const useInvalidateStaff = () => {
  const invalidateStaff = staffApi.useUtils().staff.get.invalidate;

  return (id: string) => invalidateStaff({ id });
};
