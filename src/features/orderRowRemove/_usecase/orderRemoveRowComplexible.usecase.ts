import { OrderEntity } from "@/entities/order";
import { createOrderAbility } from "@/entities/order/server";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { OrderRowRemoveComplexible } from "../_domain/types";
import { OrderRowRemoveTx } from "../_tx/orderRowRemove.transaction";
import { injectable } from "inversify";

type RemoveRowOrder = {
  dataToRemove: OrderRowRemoveComplexible;
  session: SessionEntity;
};

@injectable()
export class RemoveOrderRowComplexibleUseCase {
  constructor(private readonly orderRowRemoveTx: OrderRowRemoveTx) {}

  async exec(data: RemoveRowOrder): Promise<OrderEntity> {
    const { dataToRemove, session } = data;

    const { canUpdateOrder } = createOrderAbility(session);

    if (!canUpdateOrder()) {
      throw new ForbiddenError();
    }

    return await this.orderRowRemoveTx.exec(dataToRemove);
  }
}
