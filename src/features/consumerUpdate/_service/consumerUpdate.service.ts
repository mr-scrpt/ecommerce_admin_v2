import { injectable } from "inversify";
import { IConsumerUpdateTx } from "../_domain/transaction.type";
import { ConsumerUpdateTxPayload } from "../_domain/types";
import { Consumer } from "@/kernel/domain/consumer/consumer.type";

@injectable()
export class ConsumerUpdateService {
  constructor(private readonly consumerUpdateTx: IConsumerUpdateTx) {}

  async execute(payload: ConsumerUpdateTxPayload): Promise<Consumer> {
    return await this.consumerUpdateTx.update(payload);
  }
}
