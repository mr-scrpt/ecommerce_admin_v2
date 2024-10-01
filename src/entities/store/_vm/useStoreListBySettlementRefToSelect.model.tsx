import { buildStoreOptionsArray } from "@/kernel/domain/store/form.schema";
import { useStoreListBySettlementRefQuery } from "../_query/storeListBySettlementRef";

export const useStoreListBySettlementRefToSelectModel = (
  settlementRef?: string,
) => {
  const { storeList, isPending } =
    useStoreListBySettlementRefQuery(settlementRef);

  const storeListToSelect = buildStoreOptionsArray(storeList);

  return {
    storeListToSelect,
    isPending,
  };
};
