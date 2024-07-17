import { useStaffListQuery } from "@/entities/staff";
import { buildDate } from "@/shared/lib/date";

export const useStaffTableList = () => {
  const { isPending, isSuccess, staffList, isFetchedAfterMount } =
    useStaffListQuery();

  const staffListBuild = staffList?.map((item) => ({
    id: item.id,
    name: item.name,
    role: item.role,
    createdAt: buildDate(item.createdAt),
  }));

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    staffList: staffListBuild ?? [],
  };
};
