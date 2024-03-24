import { OrderRowEntity } from "@/entities/order";
import { createOrderAbility } from "@/entities/order/server";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { OrderRowChangeQuantityComplexible } from "../_domain/types";
import {
  OrderRowChangeQuantityTx,
  orderRowChangeQuantityTx,
} from "../_tx/orderRowChageQuantity.transaction";

type ChangeQuantityOrderRow = {
  dataToUpdate: OrderRowChangeQuantityComplexible;
  session: SessionEntity;
};

class ChangeOrderRowQuantityComplexibleUseCase {
  constructor(
    private readonly orderRowChangeQuantityTx: OrderRowChangeQuantityTx,
  ) {}

  async exec(data: ChangeQuantityOrderRow): Promise<OrderRowEntity> {
    const { dataToUpdate, session } = data;

    const { canUpdateOrder } = createOrderAbility(session);

    if (!canUpdateOrder()) {
      throw new ForbiddenError();
    }

    return await this.orderRowChangeQuantityTx.exec(dataToUpdate);
  }
}

export const changeOrderRowQuantityComplexibleUseCase =
  new ChangeOrderRowQuantityComplexibleUseCase(orderRowChangeQuantityTx);
