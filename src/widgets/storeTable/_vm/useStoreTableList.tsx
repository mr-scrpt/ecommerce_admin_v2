import { useStoreWithSettlementNameListQuery } from "@/features/storeData";
import { buildDate } from "@/shared/lib/date";

export const useStoreTableList = () => {
  const {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    storeList: data,
  } = useStoreWithSettlementNameListQuery();

  const storeList = data?.map((item) => ({
    id: item.id,
    name: item.name,
    settlement: item.settlementName,
    createdAt: buildDate(item.createdAt),
  }));

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    storeList: storeList ?? [],
  };
};
