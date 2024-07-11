"use client";
import { Address } from "@/kernel/domain/address/address.type";
import { addressApi } from "../_api/address.api";
import { useListenAddressListByUserUpdate } from "../_vm/event/useListenAddressListUpdateByUser";
import { useListenAddressListByUserAndSettlementRefUpdate } from "../_vm/event/useListenAddressListByUserAndSettlementRefUpdate";

interface IAddressListToSelectQuery {
  userId: string;
  settlementRef: string;
}

export const useAddressListByUserAndSettlementRef = (
  query: IAddressListToSelectQuery,
) => {
  const { data, isPending, isSuccess, isFetchedAfterMount } =
    addressApi.address.getListByUserAndSettlementRef.useQuery<Array<Address>>(
      query,
    );

  useListenAddressListByUserUpdate();
  useListenAddressListByUserAndSettlementRefUpdate();
  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    addressList: data ?? [],
  };
};

export const useInvalidateAddressByUserAndSettlementRef = () => {
  const invalidateAddress =
    addressApi.useUtils().address.getListByUserAndSettlementRef.invalidate;
  return (userId: string) => invalidateAddress({ userId });
};
