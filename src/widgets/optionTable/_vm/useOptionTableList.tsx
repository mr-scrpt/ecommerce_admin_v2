import { useOptionListQuery } from "@/entities/property";
import { buildDate } from "@/shared/lib/date";

export const useOptionTableList = () => {
  const {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    optionList: data,
  } = useOptionListQuery();

  const optionList = data?.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: buildDate(item.createdAt),
  }));

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    optionList: optionList ?? [],
  };
};
