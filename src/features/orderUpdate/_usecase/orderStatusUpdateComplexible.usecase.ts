import { OrderEntity } from "@/entities/order";
import { createOrderAbility } from "@/entities/order/server";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { OrderUpdateStatusComplexible } from "../_domain/types";
import { OrderUpdateStatusTx } from "../_tx/orderUpdate.transaction";
import { injectable } from "inversify";

type UpdateOrderStatus = {
  dataToUpdate: OrderUpdateStatusComplexible;
  session: SessionEntity;
};

@injectable()
export class UpdateOrderStatusComplexibleUseCase {
  constructor(private readonly orderUpdateStatusTx: OrderUpdateStatusTx) {}

  async exec(data: UpdateOrderStatus): Promise<OrderEntity> {
    const { dataToUpdate, session } = data;

    const { canUpdateOrder } = createOrderAbility(session);

    if (!canUpdateOrder()) {
      throw new ForbiddenError();
    }

    return await this.orderUpdateStatusTx.exec(dataToUpdate);
  }
}
