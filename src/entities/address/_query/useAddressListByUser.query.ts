"use client";
import { Address } from "@/kernel/domain/address/address.type";
import { addressApi } from "../_api/address.api";
import { useListenAddressListByUserUpdate } from "../_vm/event/useListenAddressListUpdateByUser";

export const useAddressListByUser = (userId: string) => {
  const { data, isPending, isSuccess, isFetchedAfterMount } =
    addressApi.address.getListByUser.useQuery<Array<Address>>({ userId });

  useListenAddressListByUserUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    addressList: data ?? [],
  };
};

export const useInvalidateAddressListByUser = () => {
  const invalidateAddress =
    addressApi.useUtils().address.getListByUser.invalidate;
  return (userId: string) => invalidateAddress({ userId });
};
