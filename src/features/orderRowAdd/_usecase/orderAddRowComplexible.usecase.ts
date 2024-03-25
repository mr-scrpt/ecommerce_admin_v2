import { OrderEntity } from "@/entities/order";
import { createOrderAbility } from "@/entities/order/server";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { OrderRowAddComplexible } from "../_domain/types";
import { OrderRowAddTx, orderRowAddTx } from "../_tx/orderRowAdd.transaction";
import {
  ProductRepository,
  productRepository,
} from "@/entities/product/server";

type AddRowOrder = {
  dataToAdd: OrderRowAddComplexible;
  session: SessionEntity;
};

class AddOrderRowComplexibleUseCase {
  constructor(
    private readonly orderRowAddTx: OrderRowAddTx,
    // private readonly productRepo: ProductRepository,
  ) {}

  async exec(data: AddRowOrder): Promise<OrderEntity> {
    const { dataToAdd, session } = data;
    const { productId, quantity, orderId } = dataToAdd;

    const { canUpdateOrder } = createOrderAbility(session);

    if (!canUpdateOrder()) {
      throw new ForbiddenError();
    }

    return await this.orderRowAddTx.exec(dataToAdd);
  }
}

export const addOrderRowComplexibleUseCase = new AddOrderRowComplexibleUseCase(
  orderRowAddTx,
);
