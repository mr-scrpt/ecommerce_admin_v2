import { OrderEntity } from "@/entities/order";
import {
  OrderRepository,
  OrderRowRepository,
  orderRepository,
  orderRowRepository,
} from "@/entities/order/server";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { OrderRowRemoveComplexible } from "../_domain/types";

export class OrderRowRemoveTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly orderRowRepo: OrderRowRepository,
    private readonly orderRepo: OrderRepository,
  ) {
    super(dbClient);
  }

  async exec(data: OrderRowRemoveComplexible): Promise<OrderEntity> {
    const action = async (tx: Tx) => {
      const { orderRowId } = data;
      const { orderId } = await this.orderRowRepo.removeOrderRow(
        orderRowId,
        tx,
      );

      return await this.orderRepo.getOrder(orderId, tx);
    };

    return await this.start(action);
  }
}

export const orderRowRemoveTx = new OrderRowRemoveTx(
  dbClient,
  orderRowRepository,
  orderRepository,
);
