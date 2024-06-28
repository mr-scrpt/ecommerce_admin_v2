import { ConsumerGetByOrderSelector } from "@/entities/consumer";
import { ConsumerRelationEntity } from "./consumer.type";

export abstract class IConsumerRelationGetByOrderTx {
  abstract getConsumerByOrder(
    selector: ConsumerGetByOrderSelector,
  ): Promise<ConsumerRelationEntity>;
}
