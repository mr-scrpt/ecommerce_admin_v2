// "use client";
// import { Receiver } from "@/kernel/domain/receiver/receiver.type";
// import { receiverApi } from "../_api/receiver.api";
// import { useListenReceiverListByOrderUpdate } from "../_vm/event/__useListenAddressListUpdateByOrder";
//
// export const useReceiverListByOrder = (orderId: string) => {
//   const { data, isPending, isSuccess, isFetchedAfterMount } =
//     receiverApi.receiver.getListByOrder.useQuery<Array<Receiver>>({ orderId });
//
//   useListenReceiverListByOrderUpdate();
//
//   return {
//     isPending,
//     isSuccess,
//     isFetchedAfterMount,
//     receiverList: data ?? [],
//   };
// };
//
// export const useInvalidateReceiverListByOrder = () => {
//   const invalidateReceiver =
//     receiverApi.useUtils().receiver.getListByOrder.invalidate;
//   return (orderId: string) => invalidateReceiver({ orderId });
// };
