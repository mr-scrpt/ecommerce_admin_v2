import { buildStaffOptionsArray } from "@/kernel/domain/staff/form.schema";
import { useStaffListSearchQuery } from "../_query/staffListSearch.query";

export const useStaffListSearchToSelectModel = () => {
  const {
    staffList,
    isPending: isUserPending,
    searchValue,
    toSearch,
  } = useStaffListSearchQuery();

  const userList = buildStaffOptionsArray(staffList).filter(
    (item): item is typeof item & { name: string } => !!item.name,
  );

  return {
    toSearch,
    searchValue,
    userList,
    isPending: isUserPending,
  };
};
