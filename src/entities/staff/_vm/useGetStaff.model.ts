import { useAppearanceDelay } from "@/shared/lib/react";
import { useStaffQuery } from "../_query/staff.query";

export const useGetStaffModel = (id: string) => {
  const { staff, isPending, isSuccess } = useStaffQuery(id);

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    staff,
    isAppearancePending,
    isSuccess,
  };
};
