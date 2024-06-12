import { OrderEntity } from "@/entities/order";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { OrderEmptyCreateTxDTO } from "../_domain/types";
import { IOrderRepository } from "@/entities/order/server";

@injectable()
export class OrderCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly orderRepo: IOrderRepository,
  ) {
    super(db);
  }

  async createEmpty(dto: OrderEmptyCreateTxDTO): Promise<OrderEntity> {
    const { orderData } = dto;
    const action = async (tx: Tx) => {
      const { id } = await this.orderRepo.createEmpty(
        { data: orderData },
        tx,
      );

      return await this.orderRepo.get({ id }, tx);
    };

    return await this.start(action);
  }
}
