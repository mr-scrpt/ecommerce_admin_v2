"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateStaff } from "../../_query/staff.query";

export const useListenStaffUpdate = () => {
  const invalidateStaff = useInvalidateStaff();

  useSocketHandler(WSEventEnum.USER_REFRESH, (userId: string) => {
    console.log("output_log: staff invalidate!!! =>>>", userId);
    invalidateStaff(userId);
  });
};
