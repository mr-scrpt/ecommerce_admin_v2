import { ConsumerEntity } from "@/kernel/domain/consumer/consumer.type";
import { ConsumerRemoveTxDTO } from "./types";

export abstract class IConsumerRemoveTx {
  abstract remove(dto: ConsumerRemoveTxDTO): Promise<ConsumerEntity>;
}
