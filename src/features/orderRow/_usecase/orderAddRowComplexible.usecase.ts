import { OrderEntity } from "@/entities/order";
import { createOrderAbility } from "@/entities/order/server";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { OrderRowAddComplexible } from "../_domain/types";
import { OrderRowAddTx } from "../_tx/orderRowAdd.transaction";
import { injectable } from "inversify";

type AddRowOrder = {
  dataToAdd: OrderRowAddComplexible;
  session: SessionEntity;
};

@injectable()
export class AddOrderRowComplexibleUseCase {
  constructor(private readonly orderRowAddTx: OrderRowAddTx) {}

  async exec(data: AddRowOrder): Promise<OrderEntity> {
    const { dataToAdd, session } = data;
    // const { productId, quantity, orderId } = dataToAdd;

    const { canUpdateOrder } = createOrderAbility(session);

    if (!canUpdateOrder()) {
      throw new ForbiddenError();
    }

    return await this.orderRowAddTx.exec(dataToAdd);
  }
}
