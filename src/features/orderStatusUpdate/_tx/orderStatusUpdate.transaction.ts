import { OrderEntity } from "@/entities/order";
import { OrderRepository, orderRepository } from "@/entities/order/server";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { OrderUpdateStatusComplexible } from "../_domain/types";

export class OrderUpdateStatusTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly orderRepo: OrderRepository,
  ) {
    super(dbClient);
  }

  async exec(data: OrderUpdateStatusComplexible): Promise<OrderEntity> {
    const action = async (tx: Tx) => {
      const { orderStatus, paymentStatus, orderId } = data;

      await this.orderRepo.updateOrderStatus(
        orderId,
        {
          orderStatus,
          paymentStatus,
        },
        tx,
      );

      return await this.orderRepo.getOrder(orderId, tx);
    };

    return await this.start(action);
  }
}

export const orderUpdateStatusTx = new OrderUpdateStatusTx(
  dbClient,
  orderRepository,
);
