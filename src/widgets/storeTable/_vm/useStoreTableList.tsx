import { useStoreListWithRelationQuery } from "@/entities/store";
import { buildDate } from "@/shared/lib/date";

export const useStoreTableList = () => {
  const {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    storeList: data,
  } = useStoreListWithRelationQuery();

  const storeList = data?.map((item) => ({
    id: item.id,
    name: item.name,
    settlement: item.settlement.description,
    createdAt: buildDate(item.createdAt),
  }));

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    storeList: storeList ?? [],
  };
};
