// "use client";
// import { useInvalidateReceiverListByOrder } from "../../_query/__useReceiverListByOrder.query";
// import { useSocketHandler } from "@/shared/lib/socket";
// import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
//
// export const useListenReceiverListByOrderUpdate = () => {
//   const invalidateReceiverByOrder = useInvalidateReceiverListByOrder();
//
//   useSocketHandler(WSEventEnum.RECEIVER_REFRESH, (userId: string) => {
//     console.log("output_log: refresh receiver =>>>", userId);
//     invalidateReceiverByOrder(userId);
//   });
// };
