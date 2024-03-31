import { createUserAbility } from "@/entities/user/user";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { OrderOwnerData } from "../_domain/types";
import { OrderOwnerTx, orderOwnerTx } from "../_tx/orderOwner.transaction";

type GetOwnerWithOrderList = {
  orderId: string;
  session: SessionEntity;
};

class GetOwnerWithOrderListComplexibleUseCase {
  constructor(private readonly orderOwnerTx: OrderOwnerTx) {}

  async exec(data: GetOwnerWithOrderList): Promise<OrderOwnerData> {
    const { orderId, session } = data;

    const { canGetUser } = createUserAbility(session);

    if (!canGetUser()) {
      throw new ForbiddenError();
    }

    const result = await this.orderOwnerTx.getOwnerWithOrderList(orderId);
    return result;

    // return {
    //   ...orderOwnerData,
    //   orderList: this.buildDataInOrderList(orderOwnerData.orderList),
    // };
  }

  // private buildDataInOrderList(orderList: Array<OrderEntity>) {
  //   return orderList.map((order) => ({
  //     ...order,
  //     createdAt: buildDate(order.createdAt),
  //   }));
  // }
}

export const getOwnerWithOrderListComplexibleUseCase =
  new GetOwnerWithOrderListComplexibleUseCase(orderOwnerTx);
