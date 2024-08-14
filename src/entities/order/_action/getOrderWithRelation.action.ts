// "use server";
// import { z } from "zod";
// import { orderRelationSchema } from "../_domain/order.schema";
// import { OrderRelation } from "../_domain/order.types";
// import { getOrderWithRelationUseCase } from "../_usecase/instans.usecase";
// import { SessionContainer } from "@/shared/session/instans";
//
// const propsSchema = z.object({
//   orderId: z.string(),
// });
//
// const resultSchema = z.object({
//   order: orderRelationSchema,
// });
//
// type ResultT = { order: OrderRelation };
//
// export const getOrderWithRelationAction = async (
//   props: z.infer<typeof propsSchema>,
// ): Promise<ResultT> => {
//   const { orderId } = propsSchema.parse(props);
//   const session = await SessionContainer.getStrict();
//
//   const order = await getOrderWithRelationUseCase.exec({
//     orderId,
//     session,
//   });
//
//   return resultSchema.parseAsync({
//     order,
//   });
// };
