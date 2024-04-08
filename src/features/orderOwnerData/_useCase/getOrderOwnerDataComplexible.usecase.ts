import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { OrderOwnerDataEntity } from "../_domain/types";
import { OrderOwnerDataTx } from "../_tx/orderOwnerData.transaction";
import { createUserAbility } from "@/entities/user/user.server";

type GetOrderOwnerData = {
  orderId: string;
  session: SessionEntity;
};

@injectable()
export class GetOrderOwnerDataComplexibleUseCase {
  constructor(private readonly orderOwnerTx: OrderOwnerDataTx) {}

  async exec(data: GetOrderOwnerData): Promise<OrderOwnerDataEntity> {
    const { orderId, session } = data;

    const { canGetUser } = createUserAbility(session);

    if (!canGetUser()) {
      throw new ForbiddenError();
    }
    console.log("output_log:  =>>> in usecase", orderId);

    const result = await this.orderOwnerTx.getOwnerWithOrderList(orderId);
    return result;
  }
}
