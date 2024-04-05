import { OrderRepository, orderRepository } from "@/entities/order/server";
import { UserRepository, userRepository } from "@/entities/user/user";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { OrderOwnerDataEntity } from "../_domain/types";

export class OrderOwnerTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly orderRepo: OrderRepository,
    private readonly userRepo: UserRepository,
  ) {
    super(dbClient);
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

export const orderOwnerTx = new OrderOwnerTx(
  dbClient,
  orderRepository,
  userRepository,
);
