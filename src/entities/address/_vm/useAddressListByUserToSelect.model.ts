"use client";

import { useAddressListByUser } from "../_query/useAddressListByUser.query";

export const useAddressListByUserToSelectModel = (userId: string) => {
  const { addressList, isPending, isSuccess, isFetchedAfterMount } =
    useAddressListByUser(userId);

  const sotoreListToSelect = addressList.map((address) => {
    return {
      value: address.id,
      label: `${address.street}, ${address.house} ${address.apartment}`,
    };
  });

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    addressListToSelect: sotoreListToSelect,
  };
};
