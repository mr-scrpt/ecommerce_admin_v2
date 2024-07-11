"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateAddressListByUser } from "../../_query/useAddressListByUser.query";

export const useListenAddressListByUserUpdate = () => {
  const invalidateAddressByUser = useInvalidateAddressListByUser();

  useSocketHandler(WSEventEnum.ADDRESS_REFRESH, (userId: string) => {
    console.log("output_log: refresh address =>>>", userId);
    invalidateAddressByUser(userId);
  });
};
