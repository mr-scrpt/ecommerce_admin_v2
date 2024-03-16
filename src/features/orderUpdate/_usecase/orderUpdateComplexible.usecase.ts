import { OrderEntity } from "@/entities/order";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { OrderUpdateComplexible } from "../_domain/types";
import { OrderUpdateTx, orderUpdateTx } from "../_tx/orderUpdate.transaction";
import { createOrderAbility } from "@/entities/order/server";

type UpdateOrder = {
  dataToUpdate: OrderUpdateComplexible;
  session: SessionEntity;
};

class UpdateOrderComplexibleUseCase {
  constructor(private readonly orderUpdateTx: OrderUpdateTx) {}

  async exec(data: UpdateOrder): Promise<OrderEntity> {
    const { dataToUpdate, session } = data;

    const { canUpdateOrder } = createOrderAbility(session);

    if (!canUpdateOrder()) {
      throw new ForbiddenError();
    }

    return await this.orderUpdateTx.updateOrderComplexible(dataToUpdate);
  }
}

export const updateOrderComplexibleUseCase = new UpdateOrderComplexibleUseCase(
  orderUpdateTx,
);
