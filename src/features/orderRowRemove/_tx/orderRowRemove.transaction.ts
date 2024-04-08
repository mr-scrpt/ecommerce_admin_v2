import { OrderEntity } from "@/entities/order";
import { OrderRepository, OrderRowRepository } from "@/entities/order/server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { OrderRowRemoveComplexible } from "../_domain/types";
import { injectable } from "inversify";

@injectable()
export class OrderRowRemoveTx extends Transaction {
  constructor(
    readonly db: DBClient,
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

      const orderRowList = await this.orderRowRepo.getOrerRowList(orderId, tx);

      const totalPrice = orderRowList.reduce(
        (acc, row) => acc + row.price * row.quantity,
        0,
      );

      const order = await this.orderRepo.getOrder(orderId, tx);

      await this.orderRepo.updateTotalPrice(orderId, totalPrice, tx);

      return order;
    };

    return await this.start(action);
  }
}
