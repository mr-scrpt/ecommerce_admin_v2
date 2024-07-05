"use client";
import { addressApi } from "../_api/address.api";
import { Address } from "../_domain/address.types";
import { useListenAddressListUpdate } from "../_vm/event/useListenAddressListUpdate";

export const useAddressListQuery = () => {
  const { data, isPending, isSuccess, isFetchedAfterMount } =
    addressApi.address.getList.useQuery<Array<Address>>();

  useListenAddressListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    addressList: data ?? [],
  };
};

export const useInvalidateAddressList = () => {
  const invalidateAddress = addressApi.useUtils().address.getList.invalidate;
  return () => invalidateAddress();
};
