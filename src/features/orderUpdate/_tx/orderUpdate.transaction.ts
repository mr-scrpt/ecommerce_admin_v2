import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IOrderStatusUpdateTx } from "../_domain/transaction.type";
import { OrderStatusUpdateTxDTO } from "../_domain/types";
import { IOrderRepository } from "@/kernel/domain/order/repository.type";
import { OrderEntity } from "@/kernel/domain/order/order.type";

@injectable()
export class OrderStatusUpdateTx
  extends Transaction
  implements IOrderStatusUpdateTx
{
  constructor(
    readonly db: DBClient,
    private readonly orderRepo: IOrderRepository,
  ) {
    super(db);
  }

  async update(dto: OrderStatusUpdateTxDTO): Promise<OrderEntity> {
    const action = async (tx: Tx) => {
      const { selector, orderStatusData, orderPaymentStatusData } = dto;

      await this.orderRepo.update(
        {
          selector,
          data: {
            orderStatus: orderStatusData,
            paymentStatus: orderPaymentStatusData,
          },
        },
        tx,
      );

      return await this.orderRepo.get({ id: selector.id }, tx);
    };

    return await this.start(action);
  }
}
