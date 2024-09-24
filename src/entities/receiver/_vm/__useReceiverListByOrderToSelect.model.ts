// "use client";
//
// import { useAppearanceDelay } from "@/shared/lib/react";
// import { useReceiverListByOrder } from "../_query/__useReceiverListByOrder.query";
//
// export const useReceiverListByOrderToSelectModel = (orderId: string) => {
//   const { receiverList, isPending, isSuccess, isFetchedAfterMount } =
//     useReceiverListByOrder(orderId);
//
//   const receiverListToSelect = receiverList.map((receiver) => {
//     return {
//       value: receiver.id,
//       label: `${receiver.name}, ${receiver.lastName} | ${receiver.phone}`,
//       name: receiver.name,
//       phone: receiver.phone,
//       lastName: receiver.lastName,
//     };
//   });
//
//   const isAppearancePending = useAppearanceDelay(isPending);
//
//   return {
//     isAppearancePending,
//     isSuccess,
//     isFetchedAfterMount,
//     receiverListToSelect,
//   };
// };
