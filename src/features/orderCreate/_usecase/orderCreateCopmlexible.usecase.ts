// import { OrderEntity } from "@/entities/order";
// import { createOrderAbility } from "@/entities/order/server";
// import { ForbiddenError } from "@/shared/lib/errors";
// import { SessionEntity } from "@/shared/lib/user";
// import { OrderCreateComplexible } from "../_domain/types";
// import { OrderCreateTx } from "../_tx/orderCreate.transaction";
// import { injectable } from "inversify";
//
// type CreateOrder = {
//   dataToCreate: OrderCreateComplexible;
//   session: SessionEntity;
// };
//
// @injectable()
// export class CreateOrderComplexibleUseCase {
//   constructor(private readonly orderCreateTx: OrderCreateTx) {}
//
//   async exec(data: CreateOrder): Promise<OrderEntity> {
//     const { dataToCreate, session } = data;
//
//     const { canCreateOrder } = createOrderAbility(session);
//
//     if (!canCreateOrder()) {
//       throw new ForbiddenError();
//     }
//
//     return await this.orderCreateTx.exec(dataToCreate);
//   }
// }
