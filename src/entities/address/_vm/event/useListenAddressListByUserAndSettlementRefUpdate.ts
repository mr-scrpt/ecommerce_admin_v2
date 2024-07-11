"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateAddressByUserAndSettlementRef } from "../../_query/useAddressListByUserAndSettlementRef.query";

export const useListenAddressListByUserAndSettlementRefUpdate = () => {
  const invalidateAddressByUserAndSettlementRef =
    useInvalidateAddressByUserAndSettlementRef();

  useSocketHandler(WSEventEnum.ADDRESS_REFRESH, (userId: string) => {
    console.log("output_log: category address =>>>", userId);
    invalidateAddressByUserAndSettlementRef(userId);
  });
};
