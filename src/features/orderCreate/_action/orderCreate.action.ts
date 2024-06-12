// "use server";
// import { z } from "zod";
//
// import { Order, orderSchema } from "@/entities/order";
// import { createOrderComplexibleUseCase } from "../_usecase/instans.usecase";
// import { SessionContainer } from "@/shared/session/instans";
//
// const propsSchema = z.object({
//   userId: z.string(),
//   // data: orderCreateSchema,
// });
//
// const resultSchema = z.object({
//   order: orderSchema,
// });
//
// type ResultT = { order: Order };
//
// export const createOrderAction = async (
//   props: z.infer<typeof propsSchema>,
// ): Promise<ResultT> => {
//   const { userId } = propsSchema.parse(props);
//
//   const session = await SessionContainer.getStrict();
//
//   const order = await createOrderComplexibleUseCase.exec({
//     session,
//     dataToCreate: {
//       userId,
//       // orderStatus,
//       // paymentStatus,
//       // orderRowData,
//     },
//   });
//
//   return resultSchema.parseAsync({
//     order,
//   });
// };
