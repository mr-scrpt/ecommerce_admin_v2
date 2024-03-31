import { buildDate } from "@/shared/lib/date";
import { OrderOwnerDataUI } from "../_domain/types";
import { useOrderOwnerQuery } from "../query/orderOwnerData.query";

export const useGetOwnerOrderData = (orderId: string) => {
  const { data, isPending, isSuccess } = useOrderOwnerQuery(orderId);

  const orderOwnerDataBuild: OrderOwnerDataUI = {
    owner: data?.owner ?? undefined, // Используем undefined если data?.owner не определено
    orderList:
      data?.orderList?.map((item) => ({
        ...item,
        createdAt: buildDate(item.createdAt),
      })) ?? [],
  };

  return {
    orderOwnerData: orderOwnerDataBuild,
    isPending,
    isSuccess,
  };
};
