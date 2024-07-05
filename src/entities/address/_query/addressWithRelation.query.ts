"use client";
import { addressApi } from "../_api/address.api";
import { AddressRelation } from "../_domain/address.types";
import { useListenAddressUpdate } from "../_vm/event/useListenAddressUpdate";

type QueryParams = {
  id?: string;
  slug?: string;
};

export const useAddressWithRelationQuery = (query: QueryParams) => {
  const { data, isPending, isSuccess, isFetchedAfterMount } =
    addressApi.address.getRelation.useQuery<AddressRelation>(query);

  useListenAddressUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    address: data ?? null,
  };
};

export const useInvalidateAddressWithRelation = () => {
  const invalidateAddress =
    addressApi.useUtils().address.getRelation.invalidate;
  return (params: QueryParams) => invalidateAddress(params);
};
