import { ConsumerGetByOrderSelector } from "@/entities/consumer";
import { IOrderRepository } from "@/entities/order/server";
import { IUserRepository } from "@/entities/user/user.server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IConsumerDataGetByOrderTx } from "../_domain/transaction.type";
import { ConsumerDataEntity } from "../_domain/types";

@injectable()
export class ConsumerDataGetByOrderTx
  extends Transaction
  implements IConsumerDataGetByOrderTx
{
  constructor(
    readonly db: DBClient,
    private readonly orderRepo: IOrderRepository,
    private readonly userRepo: IUserRepository,
  ) {
    super(db);
  }

  async getConsumerDataByOrder(
    selector: ConsumerGetByOrderSelector,
  ): Promise<ConsumerDataEntity> {
    const { orderId } = selector;
    const action = async (tx: Tx) => {
      const { userId } = await this.orderRepo.get({ id: orderId }, tx);
      const consumer = await this.userRepo.get({ id: userId }, tx);

      const orderListData = await this.orderRepo.getListByConsumer(
        { consumerId: consumer.id },
        tx,
      );

      return {
        consumerData: consumer,
        orderListData,
      };
    };

    return await this.start(action);
  }
}
