import { useConsumerListQuery } from "@/entities/consumer";
import { buildDate } from "@/shared/lib/date";

export const useConsumerTableList = () => {
  const { isPending, isSuccess, consumerList, isFetchedAfterMount } =
    useConsumerListQuery();

  const consumerListBuild = consumerList?.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: buildDate(item.createdAt),
  }));

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    consumerList: consumerListBuild ?? [],
  };
};
