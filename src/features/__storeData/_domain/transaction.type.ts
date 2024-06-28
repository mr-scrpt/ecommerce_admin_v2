import { ConsumerGetByOrderSelector } from "@/entities/consumer";

export abstract class IConsumerDataGetByOrderTx {
  abstract getConsumerDataByOrder(
    selector: ConsumerGetByOrderSelector,
  ): Promise<ConsumerDataEntity>;
}
