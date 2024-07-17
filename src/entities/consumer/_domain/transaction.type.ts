import {
  ConsumerGetByOrderSelector,
  ConsumerRelationEntity,
} from "./consumer.type";

export abstract class IConsumerRelationGetByOrderTx {
  abstract getConsumerByOrder(
    selector: ConsumerGetByOrderSelector,
  ): Promise<ConsumerRelationEntity>;
}
