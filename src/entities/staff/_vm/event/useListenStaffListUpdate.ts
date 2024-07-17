"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateStaffList } from "../../_query/staffList.query";

export const useListenStaffListUpdate = () => {
  const invalidateUserList = useInvalidateStaffList();

  useSocketHandler(WSEventEnum.USER_LIST_REFRESH, () => {
    console.log("output_log: staff list invalidate!!! =>>>");
    invalidateUserList();
  });
};
