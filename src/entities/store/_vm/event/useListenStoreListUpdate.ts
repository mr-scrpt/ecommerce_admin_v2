"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateStoreList } from "../../_query/storeList.query";

export const useListenStoreListUpdate = () => {
  const invalidateStoreList = useInvalidateStoreList();

  useSocketHandler(WSEventEnum.STORE_LIST_REFRESH, () => {
    console.log("output_log: store list invalidate =>>>");
    invalidateStoreList();
  });
};
