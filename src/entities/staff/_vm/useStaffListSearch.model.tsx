import { useStaffListSearchQuery } from "../_query/staffListSearch.query";

export const useStaffListSearchToSelectModel = () => {
  const {
    staffList,
    isPending: isUserPending,
    searchValue,
    toSearch,
  } = useStaffListSearchQuery();

  const userList = staffList
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
