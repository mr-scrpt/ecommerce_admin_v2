import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { ConsumerUpdateTxDTO } from "../_domain/types";
import { IConsumerUpdateTx } from "../_domain/transaction.type";
import { ConsumerEntity } from "@/kernel/domain/consumer/consumer.type";
import { IConsumerRepository } from "@/kernel/domain/consumer/repository.type";

@injectable()
export class ConsumerUpdateTx extends Transaction implements IConsumerUpdateTx {
  constructor(
    readonly db: DBClient,
    private readonly consumerRepo: IConsumerRepository,
  ) {
    super(db);
  }

  async update(dto: ConsumerUpdateTxDTO): Promise<ConsumerEntity> {
    console.log("output_log:  =>>>", dto);
    const { selector, consumerData } = dto;
    const action = async (tx: Tx) => {
      return await this.consumerRepo.update(
        { selector, data: consumerData },
        tx,
      );
    };

    return await this.start(action);
  }
}
