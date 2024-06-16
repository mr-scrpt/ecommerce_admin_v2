import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { OrderOwnerDataEntity } from "../_domain/types";
import { ConsumerDataGetByOrderTx } from "../_tx/consumerDataGetByOrder.transaction";
import { createUserAbility } from "@/entities/user/user.server";

type GetOrderOwnerData = {
  orderId: string;
  session: SessionEntity;
};

@injectable()
export class GetOrderOwnerDataComplexibleUseCase {
  constructor(private readonly orderOwnerTx: ConsumerDataGetByOrderTx) {}

  async exec(data: GetOrderOwnerData): Promise<OrderOwnerDataEntity> {
    const { orderId, session } = data;

    const { canGetUser } = createUserAbility(session);

    if (!canGetUser()) {
      throw new ForbiddenError();
    }

    const result = await this.orderOwnerTx.getConsumerDataByOrder(orderId);
    return result;
  }
}
