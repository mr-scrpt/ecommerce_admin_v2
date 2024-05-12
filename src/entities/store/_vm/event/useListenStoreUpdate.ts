"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateStore } from "../../_query/store.query";

export const useListenStoreUpdate = () => {
  const invalidateStore = useInvalidateStore();

  useSocketHandler(WSEventEnum.STORE_REFRESH, (storeId: string) => {
    console.log("output_log: store invalidate =>>>", storeId);
    invalidateStore(storeId);
  });
};
