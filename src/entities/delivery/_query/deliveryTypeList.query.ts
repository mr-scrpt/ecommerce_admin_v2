"use client";
import { DeliveryType } from "@/kernel/domain/delivery/deliveryType.type";
import { deliveryApi } from "../_api/delivery.api";
import { useListenDeliveryListUpdate } from "../_vm/event/useListenDeliveryListUpdate";

export const useDeliveryTypeAvailableListQuery = (settlementRef?: string) => {
  const { isPending, isSuccess, isFetchedAfterMount, data } =
    deliveryApi.delivery.getTypeAvailableList.useQuery<Array<DeliveryType>>({
      settlementRef,
    });

  useListenDeliveryListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    deliveryList: data ? data : [],
  };
};

export const useInvalidateDeliveryList = () => {
  const invalidateDelivery = deliveryApi.useUtils().delivery.getList.invalidate;
  return () => invalidateDelivery();
};
interface QueryResult<T> {
  isPending: boolean;
  isSuccess: boolean;
  isFetchedAfterMount: boolean;
  data?: T;
}
//
// type DeliveryQueryFunction = () => QueryResult<Array<DeliveryType>>;
//
// const deliveryQueryFunctions = {
//   default: (): DeliveryQueryFunction => () =>
//     deliveryApi.delivery.getTypeList.useQuery<Array<DeliveryType>>(),
//
//   withSettlement:
//     (settlementRef: string): DeliveryQueryFunction =>
//     () =>
//       deliveryApi.delivery.getTypeAvailableList.useQuery<Array<DeliveryType>>({
//         settlementRef,
//       }),
// };
//
// export const useDeliveryListQuery = (settlementRef?: string) => {
//   const queryType = settlementRef ? "withSettlement" : "default";
//   const queryFunction = deliveryQueryFunctions[queryType];
//
//   const { isPending, isSuccess, isFetchedAfterMount, data } = queryFunction(
//     settlementRef as string,
//   )();
//
//   useListenDeliveryListUpdate();
//
//   return {
//     isPending,
//     isSuccess,
//     isFetchedAfterMount,
//     deliveryList: data ?? [],
//   };
// };
