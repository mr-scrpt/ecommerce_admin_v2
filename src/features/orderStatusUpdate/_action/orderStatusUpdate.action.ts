// "use server";
// import { z } from "zod";
//
// import {
//   Order,
//   OrderPaymentStatusEnum,
//   OrderStatusEnum,
//   orderSchema,
// } from "@/entities/order";
// import { updateOrderStatusComplexibleUseCase } from "../_usecase/instans.usecase";
// import { SessionContainer } from "@/shared/session/instans";
//
// const propsSchema = z.object({
//   orderId: z.string(),
//   orderStatus: z.custom<OrderStatusEnum>(),
//   paymentStatus: z.custom<OrderPaymentStatusEnum>(),
// });
//
// const resultSchema = z.object({
//   order: orderSchema,
// });
//
// type ResultT = { order: Order };
//
// export const updateOrderStatusAction = async (
//   props: z.infer<typeof propsSchema>,
// ): Promise<ResultT> => {
//   const { orderId, orderStatus, paymentStatus } = propsSchema.parse(props);
//
//   const session = await SessionContainer.getStrict();
//
//   const order = await updateOrderStatusComplexibleUseCase.exec({
//     session,
//     dataToUpdate: {
//       orderId,
//       orderStatus,
//       paymentStatus,
//     },
//   });
//
//   return resultSchema.parseAsync({
//     order,
//   });
// };
