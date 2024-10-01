"use client";

import { buildAddressOptionsArray } from "@/kernel/domain/address/form.schema";
import { useAddressListByUser } from "../_query/useAddressListByUser.query";

export const useAddressListByUserToSelectModel = (userId: string) => {
  const { addressList, isPending, isSuccess, isFetchedAfterMount } =
    useAddressListByUser(userId);

  const addressListToSelect = buildAddressOptionsArray(addressList);

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    addressListToSelect,
  };
};
