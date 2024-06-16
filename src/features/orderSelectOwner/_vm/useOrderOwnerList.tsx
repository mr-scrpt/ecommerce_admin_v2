import { User, useUserListSearchQuery } from "@/entities/user/user";

export const useOrderUserListToSelectModel = () => {
  const {
    data: userData,
    isPending: isUserPending,
    searchValue,
    toSearch,
  } = useUserListSearchQuery();

  // const { order, isPending: isOrderPending } =
  //   useOrderWithRelationQuery(orderId);

  // const userList = userData?.map((item) => ({
  //   value: item.id,
  //   name: item.name,
  //   phone: item.phone,
  //   label: item.name,
  // }));
  const userList = userData
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
