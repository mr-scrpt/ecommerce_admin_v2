// "use client";
// import { AddressCreateProps } from "@/kernel/domain/address/ui.type";
// import { ReceiverCreateProps } from "@/kernel/domain/receiver/ui.type";
// import { createStrictContext, useStrictContext } from "@/shared/lib/react";
// import React, { HTMLAttributes } from "react";
//
// export interface DeliveryUpdateProviderProps
//   extends HTMLAttributes<HTMLDivElement> {
//   addressAddModal: (props: AddressCreateProps) => void;
//   receiverAddModal: (props: ReceiverCreateProps) => void;
// }
// const deliveryUpdateContext =
//   createStrictContext<DeliveryUpdateProviderProps>();
//
// export const DeliveryUpdateProvider = (props: DeliveryUpdateProviderProps) => {
//   const { addressAddModal, receiverAddModal, children } = props;
//   return (
//     <deliveryUpdateContext.Provider
//       value={{ addressAddModal, receiverAddModal }}
//     >
//       {children}
//     </deliveryUpdateContext.Provider>
//   );
// };
//
// export const useAddressAddModal = () => {
//   const { addressAddModal } = useStrictContext(deliveryUpdateContext);
//   return {
//     addressAddModal,
//   };
// };
//
// export const useReceiverAddModal = () => {
//   const { receiverAddModal } = useStrictContext(deliveryUpdateContext);
//   return {
//     receiverAddModal,
//   };
// };

// export const useSocket = () => {
//   return useStrictContext(socketContext);
// };
//
// export const useIsConnected = () => {
//   return useStrictContext(isConnectedContext);
// };
//
// export const useSocketHandler = <Arg,>(
//   event: string,
//   handler: (arg: Arg) => void,
// ) => {
//   const socket = useStrictContext(socketContext);
//
//   const eventHandler = useEventCallback(handler);
//
//   useEffect(() => {
//     socket.on(event, eventHandler);
//
//     return () => {
//       socket.off(event, eventHandler);
//     };
//   }, [socket, eventHandler, event]);
// };
