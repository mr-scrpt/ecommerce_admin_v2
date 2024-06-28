import { ConsumerRelationEntity } from "@/entities/consumer/_domain/consumer.type";
import { IConsumerRepository } from "@/kernel/domain/consumer/repository.type";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IConsumerCreateTx } from "../_domain/transaction.type";
import { ConsumerCreateTxDTO } from "../_domain/types";
import { ICartRepository } from "@/kernel/domain/cart/repository.type";

@injectable()
export class ConsumerCreateTx extends Transaction implements IConsumerCreateTx {
  constructor(
    readonly db: DBClient,
    readonly consumerRepo: IConsumerRepository,
    readonly cartRepo: ICartRepository,
  ) {
    super(db);
  }

  async createConsumer(
    dto: ConsumerCreateTxDTO,
  ): Promise<ConsumerRelationEntity> {
    const { consumerData } = dto;
    const action = async (tx: Tx): Promise<ConsumerRelationEntity> => {
      const { id } = await this.consumerRepo.create({ data: consumerData }, tx);

      await this.cartRepo.create(
        {
          data: {
            userId: id,
          },
        },
        tx,
      );

      return await this.consumerRepo.getWithRelation({ id }, tx);
    };

    return await this.start(action);
  }
}
