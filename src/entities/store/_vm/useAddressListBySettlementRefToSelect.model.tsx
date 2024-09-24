import { useMemo } from "react";
import { useStoreListBySettlementRefQuery } from "../_query/storeListBySettlementRef";
import { AddressDefaultSelectOption } from "@/kernel/domain/address/form.schema";

export const useAddressListBySettlementRefToSelectModel = (
  settlementRef?: string,
) => {
  const { storeList, isPending } =
    useStoreListBySettlementRefQuery(settlementRef);

  const storeListToSelect: Array<AddressDefaultSelectOption> = useMemo(
    () =>
      storeList.map((item) => ({
        value: item.id,
        label: `"${item.name}", ${item.address}`,
      })),
    [storeList],
  );

  return {
    storeListToSelect,
    isPending,
  };
};
