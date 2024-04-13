import {
  OrderEntity,
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/entities/order";
import { OrderRepository, OrderRowRepository } from "@/entities/order/server";
import { ProductRepository } from "@/entities/product/server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { OrderCreateComplexible } from "../_domain/types";
import { injectable } from "inversify";

@injectable()
export class OrderCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly orderRepo: OrderRepository,
  ) {
    super(dbClient);
  }

  async exec(data: OrderCreateComplexible): Promise<OrderEntity> {
    const action = async (tx: Tx) => {
      const { userId } = data;

      const { id } = await this.orderRepo.createOrder(
        {
          userId,
          orderStatus: OrderStatusEnum.TEMP,
          paymentStatus: OrderPaymentStatusEnum.TEMP,
          priceTotal: 0,
        },
        tx,
      );

      return await this.orderRepo.getOrder(id, tx);
    };

    return await this.start(action);
  }
}
