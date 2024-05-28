"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateCartWithRelation } from "../../_query/cartWithRelation.query";

export const useListenCartUpdate = () => {
  const invalidateCart = useInvalidateCartWithRelation();

  useSocketHandler(WSEventEnum.PRODUCT_REFRESH, () => {
    console.log("output_log: cart invalidate =>>>");
    invalidateCart();
  });
};
