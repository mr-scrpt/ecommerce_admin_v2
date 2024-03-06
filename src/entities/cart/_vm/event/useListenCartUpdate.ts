"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { CartId } from "../../_domain/types";
import { useInvalidateCartWithRelation } from "../../_query/cartWithRelation.query";

export const useListenCartUpdate = () => {
  const invalidateCart = useInvalidateCartWithRelation();

  useSocketHandler(WSEventEnum.PRODUCT_REFRESH, (cartId: CartId) => {
    console.log("output_log: cart invalidate =>>>", cartId);
    invalidateCart(cartId);
  });
};
