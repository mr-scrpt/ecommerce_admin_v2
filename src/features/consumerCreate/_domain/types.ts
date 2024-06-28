import { ConsumerCreateDTO } from "@/kernel/domain/consumer/consumer.dto";
import { ConsumerBase } from "@/kernel/domain/consumer/consumer.type";

type ConsumerCreatePayload = ConsumerBase;

export type ConsumerCreateTxPayload = {
  consumerData: ConsumerCreatePayload;
};

export type ConsumerCreateTxDTO = {
  consumerData: ConsumerCreateDTO["data"];
};
