// import { AuthorizatoinError } from "@/shared/lib/errors";
// import { SessionEntity } from "@/shared/lib/user";
// import { createOrderAbility } from "../_domain/order.ability";
// import { Order } from "../_domain/order.types";
// import { OrderRepository } from "../_repository/order.repo";
// import { injectable } from "inversify";
//
// type GetOrderList = {
//   session: SessionEntity;
// };
//
// @injectable()
// export class GetOrderListUseCase {
//   constructor(private readonly orderRepo: OrderRepository) {}
//
//   async exec(data: GetOrderList): Promise<Order[]> {
//     const { session } = data;
//     const { canGetOrder } = createOrderAbility(session);
//
//     if (!canGetOrder()) {
//       throw new AuthorizatoinError();
//     }
//
//     return await this.orderRepo.getOrderList();
//   }
// }
