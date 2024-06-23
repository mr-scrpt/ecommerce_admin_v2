import { buildDate } from "@/shared/lib/date";
import { useConsumerDataByOrderQuery } from "../_query/consumerDataByOrder.query";
import { ConsumerDataUI } from "../_domain/types";

export const useGetOwnerOrderDataModel = (orderId: string) => {
  const { data, isPending, isSuccess } = useConsumerDataByOrderQuery(orderId);

  const orderOwnerDataBuild: ConsumerDataUI = {
    consumerData: data?.consumerData,
    orderListData:
      data?.orderListData?.map((item) => ({
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
