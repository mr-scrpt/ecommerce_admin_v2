import { useUserListSearchQuery } from "@/entities/user/user";

export const useOrderUserListToSelect = () => {
  const {
    data: userData,
    isPending: isUserPending,
    searchValue,
    toSearch,
  } = useUserListSearchQuery();

  const userList = userData.map((item) => ({
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
