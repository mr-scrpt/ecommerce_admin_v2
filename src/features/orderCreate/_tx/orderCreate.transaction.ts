import { OrderEntity } from "@/entities/order";
import { OrderRepository } from "@/entities/order/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { OrderEmptyCreateTxDTO } from "../_domain/types";

@injectable()
export class OrderCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly orderRepo: OrderRepository,
  ) {
    super(db);
  }

  async createEmpty(dto: OrderEmptyCreateTxDTO): Promise<OrderEntity> {
    const { orderData } = dto;
    const action = async (tx: Tx) => {
      const { id } = await this.orderRepo.createOrderEmpty(
        { data: orderData },
        tx,
      );

      return await this.orderRepo.getOrder({ id }, tx);
    };

    return await this.start(action);
  }
}
