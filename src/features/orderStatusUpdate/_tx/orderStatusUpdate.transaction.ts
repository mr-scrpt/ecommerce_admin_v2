import { OrderEntity } from "@/entities/order";
import { OrderRepository } from "@/entities/order/server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db/db";
import { OrderUpdateStatusComplexible } from "../_domain/types";
import { injectable } from "inversify";

@injectable()
export class OrderUpdateStatusTx extends Transaction {
  constructor(
    readonly db: DBClient,
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
