import { ConsumerEntity } from "@/kernel/domain/consumer/consumer.type";
import { ConsumerUpdateTxDTO } from "./types";

export abstract class IConsumerUpdateTx {
  abstract update(dto: ConsumerUpdateTxDTO): Promise<ConsumerEntity>;
}
