import { ConsumerEntity } from "@/kernel/domain/consumer/consumer.type";
import { IConsumerRepository } from "@/kernel/domain/consumer/repository.type";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IConsumerRemoveTx } from "../_domain/transaction.type";
import { ConsumerRemoveTxDTO } from "../_domain/types";

@injectable()
export class ConsumerRemoveTx extends Transaction implements IConsumerRemoveTx {
  constructor(
    readonly db: DBClient,
    private readonly consumerRepo: IConsumerRepository,
  ) {
    super(db);
  }

  async remove(dto: ConsumerRemoveTxDTO): Promise<ConsumerEntity> {
    const action = async (tx: Tx) => {
      return await this.consumerRepo.remove(dto, tx);
    };

    return await this.start(action);
  }
}
