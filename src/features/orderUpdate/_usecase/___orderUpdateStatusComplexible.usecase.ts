import { OrderEntity } from "@/entities/order";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { OrderUpdateComplexible } from "../_domain/types";
import { OrderRowAddTx, orderUpdateTx } from "../_tx/orderRowAdd.transaction";
import { createOrderAbility } from "@/entities/order/server";

type UpdateOrder = {
  dataToUpdate: OrderUpdateComplexible;
  session: SessionEntity;
};

class UpdateOrderStatusComplexibleUseCase {
  constructor(private readonly orderUpdateTx: OrderRowAddTx) {}

  async exec(data: UpdateOrder): Promise<OrderEntity> {
    const { dataToUpdate, session } = data;

    const { canUpdateOrder } = createOrderAbility(session);

    if (!canUpdateOrder()) {
      throw new ForbiddenError();
    }

    return await this.orderUpdateTx.addOrderRowComplexible(dataToUpdate);
  }
}

export const updateOrderStatusComplexibleUseCase =
  new UpdateOrderStatusComplexibleUseCase(orderUpdateTx);
