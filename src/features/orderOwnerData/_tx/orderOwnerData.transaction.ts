import { OrderRepository } from "@/entities/order/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { OrderOwnerDataEntity } from "../_domain/types";
import { UserRepository } from "@/entities/user/user.server";

@injectable()
export class OrderOwnerDataTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly orderRepo: OrderRepository,
    private readonly userRepo: UserRepository,
  ) {
    super(db);
  }

  async getOwnerWithOrderList(orderId: string): Promise<OrderOwnerDataEntity> {
    const action = async (tx: Tx) => {
      const order = await this.orderRepo.getOrder(orderId, tx);
      const owner = await this.userRepo.getUser(order.userId, tx);
      const orderList = await this.orderRepo.getOrderOwnerList(owner.id, tx);

      return {
        owner,
        orderList,
      };
    };

    return await this.start(action);
  }
}
