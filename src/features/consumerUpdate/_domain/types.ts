import { ConsumerUpdateDTO } from "@/kernel/domain/consumer/consumer.dto";
import { ConsumerBase } from "@/kernel/domain/consumer/consumer.type";

type ConsumerUpdatePayload = Partial<ConsumerBase>;

export type ConsumerUpdateTxPayload = {
  selector: ConsumerUpdateSelector;
  consumerData: ConsumerUpdatePayload;
};

export type ConsumerUpdateTxDTO = {
  selector: ConsumerUpdateSelector;
  consumerData: ConsumerUpdateDTO["data"];
};

// NOTE: Selector
export type ConsumerUpdateSelector = {
  id: string;
};
