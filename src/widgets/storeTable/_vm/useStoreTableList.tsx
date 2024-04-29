import { useStoreListQuery } from "@/entities/store";
import { buildDate } from "@/shared/lib/date";

export const useStoreTableList = () => {
  const {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    storeList: data,
  } = useStoreListQuery();

  const storeList = data?.map((item) => ({
    id: item.id,
    settlement: item.settlement,
    createdAt: buildDate(item.createdAt),
  }));

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    storeList: storeList ?? [],
  };
};
