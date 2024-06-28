import { ConsumerRelationEntity } from "@/entities/consumer/_domain/consumer.type";
import { DBClient, Transaction } from "@/shared/lib/db/db";
import { ConsumerCreateTxDTO } from "./types";

export abstract class IConsumerCreateTx extends Transaction {
  constructor(readonly db: DBClient) {
    super(db);
  }

  abstract createConsumer(
    dto: ConsumerCreateTxDTO,
  ): Promise<ConsumerRelationEntity>;
}
