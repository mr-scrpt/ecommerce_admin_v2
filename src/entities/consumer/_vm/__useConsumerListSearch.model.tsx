import { useConsumerListSearchQuery } from "../_query/__consumerListSearch.query";

export const useConsumerListSearchToSelectModel = () => {
  const {
    consumerList,
    isPending: isUserPending,
    searchValue,
    toSearch,
  } = useConsumerListSearchQuery();

  const userList = consumerList
    .filter((item): item is typeof item & { name: string } => !!item.name)
    .map((item) => ({
      value: item.id,
      name: item.name,
      phone: item.phone,
      label: item.name,
    }));

  return {
    toSearch,
    searchValue,
    userList,
    isPending: isUserPending,
  };
};
