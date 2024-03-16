import { OrderRepository, orderRepository } from "@/entities/order/server";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { OrderUpdateComplexible } from "../_domain/types";
import { OrderEntity } from "@/entities/order";

export class OrderUpdateTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly orderRepo: OrderRepository,
  ) {
    super(dbClient);
  }

  async updateOrderComplexible(
    data: OrderUpdateComplexible,
  ): Promise<OrderEntity> {
    const action = async (tx: Tx) => {
      const { orderId, orderData } = data;
      const orderUpdated = await this.orderRepo.updateOrder(
        orderId,
        orderData,
        tx,
      );

      return await this.orderRepo.getOrder(orderUpdated.id, tx);
    };
    //
    return await this.start(action);
  }
}

export const orderUpdateTx = new OrderUpdateTx(dbClient, orderRepository);
