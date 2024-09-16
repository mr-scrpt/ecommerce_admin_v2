import { buildDate } from "@/shared/lib/date";
import { ConsumerRelationWithStringDateUI } from "../_domain/__ui.type";
import { useConsumerRelationByOrderQuery } from "../_query/consumerRelationByOrder.query";
import { useAppearanceDelay } from "@/shared/lib/react";

export const useGetConsumerRelationModel = (orderId: string) => {
  const { data, isPending, isSuccess } =
    useConsumerRelationByOrderQuery(orderId);
  data?.orderList.map((item) => item);

  const orderOwnerDataBuild: ConsumerRelationWithStringDateUI | undefined = data
    ? {
        consumer: {
          id: data.id,
          name: data.name,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          image: data.image,
          createdAt: buildDate(data.createdAt),
          updatedAt: buildDate(data.updatedAt),
        },
        orderList:
          data.orderList?.map((item) => ({
            ...item,
            createdAt: buildDate(item.createdAt),
            updatedAt: buildDate(item.updatedAt),
          })) ?? [],
        cart: data.cart
          ? {
              ...data.cart,
              createdAt: buildDate(data.cart.createdAt),
              updatedAt: buildDate(data.cart.updatedAt),
            }
          : null,
        receiverList: data.receiverList,
      }
    : undefined;

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    consumer: orderOwnerDataBuild,
    isAppearancePending,
    isSuccess,
  };
};
