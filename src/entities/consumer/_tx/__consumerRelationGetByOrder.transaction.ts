import { ConsumerGetByOrderSelector } from "@/entities/consumer";
import { IOrderRepository } from "@/kernel/domain/order/repository.type";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { ConsumerRelationEntity } from "../_domain/consumer.type";
import { IConsumerRelationGetByOrderTx } from "../_domain/transaction.type";
import { IConsumerRepository } from "@/kernel/domain/consumer/repository.type";

@injectable()
export class ConsumerGetByOrderTx
  extends Transaction
  implements IConsumerRelationGetByOrderTx
{
  constructor(
    readonly db: DBClient,
    private readonly orderRepo: IOrderRepository,
    private readonly consumerRepo: IConsumerRepository,
  ) {
    super(db);
  }

  async getConsumerByOrder(
    selector: ConsumerGetByOrderSelector,
  ): Promise<ConsumerRelationEntity> {
    const { orderId } = selector;
    const action = async (tx: Tx) => {
      const { userId } = await this.orderRepo.get({ id: orderId }, tx);
      const consumer =
        await this.consumerRepo.getWithRelation<ConsumerRelationEntity>(
          { id: userId },
          tx,
        );

      const orderList = await this.orderRepo.getListByConsumer(
        { consumerId: consumer.id },
        tx,
      );

      return {
        ...consumer,
        orderList,
      };
    };

    return await this.start(action);
  }
}
