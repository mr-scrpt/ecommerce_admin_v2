import { useOrderListQuery } from "@/entities/order";
import { buildDate } from "@/shared/lib/date";

export const useOrderTableList = () => {
  const {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    orderList: data,
  } = useOrderListQuery();

  const orderList = data?.map((item) => ({
    id: item.id,
    name: "",
    orderNo: item.orderNo,
    status: item.orderStatus,
    payment: item.paymentStatus,
    createdAt: buildDate(item.createdAt),
  }));

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    orderList: orderList ?? [],
  };
};
