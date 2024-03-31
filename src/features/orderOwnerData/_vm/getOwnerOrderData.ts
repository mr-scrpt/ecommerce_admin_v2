import { buildDate } from "@/shared/lib/date";
import { useOrderOwnerQuery } from "../query/orderOwnerData.query";

export const useGetOwnerOrderData = (orderId: string) => {
  const { data, isPending, isSuccess } = useOrderOwnerQuery(orderId);

  const orderOwnerDataBuild = {
    ...data,
    orderList: data?.orderList.map((item) => {
      return {
        ...item,
        createdAt: buildDate(item.createdAt),
      };
    }),
  };

  return {
    orderOwnerData: orderOwnerDataBuild,
    isPending,
    isSuccess,
  };
};
