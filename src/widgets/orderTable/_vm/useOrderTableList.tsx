import { useOrderListWithRelationQuery } from "@/entities/order";
import { buildDate } from "@/shared/lib/date";

export const useOrderTableList = () => {
  const {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    orderList: data,
  } = useOrderListWithRelationQuery();

  const orderList = data?.map((item) => ({
    id: item.id,
    name: "",
    orderNo: item.orderNo,
    orderStateStatus: item.orderStatusState.status,
    orderPaymentStatus: item.orderStatusPayment.status,
    createdAt: buildDate(item.createdAt),
  }));

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    orderList: orderList ?? [],
  };
};
