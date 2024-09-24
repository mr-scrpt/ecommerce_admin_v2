import { OrderRelation } from "@/entities/order";
import { OrderRelationEntity } from "@/entities/order/_domain/order/order.types";
import { IOrderRepository } from "@/kernel/domain/order/repository.type";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IOrderReceiverUpdateTx } from "../_domain/transaction.type";
import { OrderReceiverUpdateTxDTO } from "../_domain/types";

@injectable()
export class OrderReceiverUpdateTx
  extends Transaction
  implements IOrderReceiverUpdateTx
{
  constructor(
    readonly db: DBClient,
    private readonly orderRepo: IOrderRepository,
  ) {
    super(db);
  }

  async update(dto: OrderReceiverUpdateTxDTO): Promise<OrderRelationEntity> {
    const action = async (tx: Tx) => {
      const { selector, orderReceiverData } = dto;
      console.log("output_log: DATA===  =>>>", selector, orderReceiverData);

      await this.orderRepo.bindReceiver(
        { selector, data: orderReceiverData },
        tx,
      );

      const orderUpdate =
        await this.orderRepo.getWithRelation<OrderRelationEntity>(selector, tx);

      return orderUpdate;
    };

    return await this.start(action);
  }
}
