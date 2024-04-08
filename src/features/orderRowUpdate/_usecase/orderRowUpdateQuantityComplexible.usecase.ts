import { OrderRowEntity } from "@/entities/order";
import { createOrderAbility } from "@/entities/order/server";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { OrderRowUpdateQuantityComplexible } from "../_domain/types";
import { OrderRowUpdateQuantityTx } from "../_tx/orderRowUpdateQuantity.transaction";
import { injectable } from "inversify";

type UpdateQuantityOrderRow = {
  dataToUpdate: OrderRowUpdateQuantityComplexible;
  session: SessionEntity;
};

@injectable()
export class UpdateOrderRowQuantityComplexibleUseCase {
  constructor(
    private readonly orderRowUpdateQuantityTx: OrderRowUpdateQuantityTx,
  ) {}

  async exec(data: UpdateQuantityOrderRow): Promise<OrderRowEntity> {
    const { dataToUpdate, session } = data;

    const { canUpdateOrder } = createOrderAbility(session);

    if (!canUpdateOrder()) {
      throw new ForbiddenError();
    }

    return await this.orderRowUpdateQuantityTx.exec(dataToUpdate);
  }
}
