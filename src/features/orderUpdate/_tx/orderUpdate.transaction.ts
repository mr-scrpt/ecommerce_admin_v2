import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IOrderUpdateTx } from "../_domain/transaction.type";
import { OrderUpdateTxDTO } from "../_domain/types";
import { IOrderRepository } from "@/kernel/domain/order/repository.type";
import { OrderEntity } from "@/kernel/domain/order/order.type";

@injectable()
export class OrderStatusUpdateTx extends Transaction implements IOrderUpdateTx {
  constructor(
    readonly db: DBClient,
    private readonly orderRepo: IOrderRepository,
  ) {
    super(db);
  }

  async update(dto: OrderUpdateTxDTO): Promise<OrderEntity> {
    const action = async (tx: Tx) => {
      const { selector, orderStatusStateData, orderStatusPaymentData } = dto;

      await this.orderRepo.update(
        {
          selector,
          data: {
            orderStatusStateId: orderStatusStateData.id,
            orderStatusPaymentId: orderStatusPaymentData.id,
          },
        },
        tx,
      );

      return await this.orderRepo.get({ id: selector.id }, tx);
    };

    return await this.start(action);
  }
}
