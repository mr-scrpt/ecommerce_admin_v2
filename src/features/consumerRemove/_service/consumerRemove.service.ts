import { Consumer } from "@/kernel/domain/consumer/consumer.type";
import { injectable } from "inversify";
import { IConsumerRemoveTx } from "../_domain/transaction.type";
import { ConsumerRemoveTxPayload } from "../_domain/types";

@injectable()
export class ConsumerRemoveService {
  constructor(private readonly consumerRemoveTx: IConsumerRemoveTx) {}

  async execute(selector: ConsumerRemoveTxPayload): Promise<Consumer> {
    return await this.consumerRemoveTx.remove(selector);
  }
}
