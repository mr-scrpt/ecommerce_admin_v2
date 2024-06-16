import { ConsumerGetByOrderSelector } from "@/entities/consumer";
import { ConsumerDataEntity } from "./types";

export abstract class IConsumerDataGetByOrderTx {
  abstract getConsumerDataByOrder(
    selector: ConsumerGetByOrderSelector,
  ): Promise<ConsumerDataEntity>;
}
