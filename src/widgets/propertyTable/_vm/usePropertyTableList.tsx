import { usePropertyListQuery } from "@/entities/property";
import { buildDate } from "@/shared/lib/date";

export const usePropertyTableList = () => {
  const {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    propertyList: data,
  } = usePropertyListQuery();

  const propertyList = data?.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: buildDate(item.createdAt),
  }));

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    propertyList: propertyList ?? [],
  };
};
